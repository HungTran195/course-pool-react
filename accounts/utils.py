from accounts.models import User
from django.db.models import query
from django.http import HttpResponse
from django.conf import settings

import requests
from django.core.exceptions import ValidationError
from .models import User
from datetime import datetime

from rest_framework_jwt.settings import api_settings
from rest_framework_jwt.compat import set_cookie_with_token


GOOGLE_OAUTH2_CLIENT_ID = settings.GOOGLE_OAUTH2_CLIENT_ID
GOOGLE_OAUTH2_CLIENT_SECRET = settings.GOOGLE_OAUTH2_CLIENT_SECRET

GOOGLE_ACCESS_TOKEN_OBTAIN_URL = 'https://oauth2.googleapis.com/token'
GOOGLE_USER_INFO_URL = 'https://www.googleapis.com/oauth2/v3/userinfo'


def jwt_login(*, response: HttpResponse, user: User) -> HttpResponse:
    """
    Set JWT token and send token to client as HttpOnly Cookie
    """
    jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
    jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

    payload = jwt_payload_handler(user)
    token = jwt_encode_handler(payload)

    if api_settings.JWT_AUTH_COOKIE:
        # Reference: https://github.com/Styria-Digital/django-rest-framework-jwt/blob/master/src/rest_framework_jwt/compat.py#L43
        set_cookie_with_token(response, api_settings.JWT_AUTH_COOKIE, token)

    return response


def google_obtain_access_token(code, redirect_uri):
    """
    Get access token from Google
    Reference: https://developers.google.com/identity/protocols/oauth2/web-server#obtainingaccesstokens
    """

    data = {
        'code': code,
        'client_id': GOOGLE_OAUTH2_CLIENT_ID,
        'client_secret': GOOGLE_OAUTH2_CLIENT_SECRET,
        'redirect_uri': redirect_uri,
        'grant_type': 'authorization_code'
    }

    response = requests.post(GOOGLE_ACCESS_TOKEN_OBTAIN_URL, data=data)
    if not response.ok:
        raise ValidationError('Failed to obtain access token from Google.')

    access_token = response.json().get('access_token')

    return access_token


def google_get_user_info(access_token):
    """
    Get user infor from google API using access token
    Ref: https://www.oauth.com/oauth2-servers/signing-in-with-google/verifying-the-user-info/       
    """
    response = requests.get(
        GOOGLE_USER_INFO_URL,
        params={'access_token': access_token}
    )
    if not response.ok:
        raise ValidationError(' Failed to get user info from Google')

    return response.json()


def user_create(profile_data, password=None, **extra_fields):
    """
    Create new user with email and profile picture
    """
    extra_fields = {
        'is_staff': False,
        'is_superuser': False,
        **extra_fields
    }

    user = User.objects.create(
        email=profile_data['email'],
        first_name=profile_data['first_name'],
        last_name=profile_data['last_name'],
        picture_url=profile_data['picture_url'])

    if password:
        user.set_password(password)
    else:
        user.set_unusable_password()

    user.full_clean()
    user.save()
    return user


def user_get_or_create(profile_data):
    """
    Check if user has already registered.
    If user registered, return that user from database
    If there is no user with email, create and return new user
    """
    user = User.objects.filter(email=profile_data.get('email'))

    if user:
        return user[0]

    return user_create(profile_data)


def get_user_info(*, user: User):
    """
    Return user information from model
    """
    return {
        'name': user.name,
        'email': user.email,
        'profile_picture': user.picture_url
    }


def jwt_response_payload_handler(token, user=None, request=None):
    """
    Creates a response payload instance that will get passed to authentication response serializer
    """
    return{
        'token': token,
        'me': get_user_info(user=user),
    }
