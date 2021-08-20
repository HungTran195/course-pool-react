from django.shortcuts import render, redirect
from django.conf import settings
from django.core.management.utils import get_random_secret_key

from rest_framework.views import APIView
from rest_framework import serializers, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from .utils import google_obtain_access_token, google_get_user_info, user_get_or_create, jwt_login, get_user_info
# from .mixins import ApiAuthMixin, PublicApiMixin

BASE_URL = 'http://127.0.0.1:8000'
LOGIN_URL = f'{BASE_URL}/accounts/auth/login'


class GetUserApi(APIView):
    """
    Determine current user. Return user name, email 
    and profile picture URL
    """
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        return Response(get_user_info(user=request.user))


class GoogleLoginAPI(APIView):
    """
    Manage login with Google
    Get token from request and obtain user information: email, 
    user name and profile picture url
    """
    permission_classes = []

    class InputSerializer(serializers.Serializer):
        code = serializers.CharField(required=True)

    def get(self, request, *args, **kwargs):
        input_serializer = self.InputSerializer(data=request.GET)
        input_serializer.is_valid(raise_exception=True)

        validated_data = input_serializer.validated_data
        code = validated_data.get('code')

        if not code:
            print(f'Code not found')
            return redirect(f'{LOGIN_URL}?error')

        redirect_uri = f'{LOGIN_URL}/google/'
        access_token = google_obtain_access_token(
            code=code, redirect_uri=redirect_uri)

        user_info = google_get_user_info(access_token)

        profile_data = {
            'first_name': user_info.get('given_name'),
            'last_name': user_info.get('family_name'),
            'email': user_info.get('email'),
            'picture_url': user_info.get('picture'),
        }

        user = user_get_or_create(profile_data)

        res = redirect(BASE_URL)
        res = jwt_login(response=res, user=user)
        return res


class LogoutAPI(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        """
        Log out user by removing JWT cookie header
        """
        user = request.user
        user.secret_key = get_random_secret_key()
        user.clean()
        user.save()

        response = Response(status=status.HTTP_202_ACCEPTED)
        response.delete_cookie(settings.JWT_AUTH['JWT_AUTH_COOKIE'])
        return response
