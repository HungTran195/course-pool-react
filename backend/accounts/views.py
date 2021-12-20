from accounts.serializers import UserSerializer
from django.shortcuts import redirect
from django.conf import settings
from django.contrib.auth import get_user_model

from rest_framework.generics import CreateAPIView
from rest_framework.views import APIView
from rest_framework import serializers, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_jwt.settings import api_settings

from .utils import google_obtain_access_token, google_get_user_info, user_get_or_create, jwt_login, get_user_info

BASE_URL = settings.BASE_URL
BASE_FRONTEND_URL= settings.BASE_FRONTEND_URL
LOGIN_URL = f'{BASE_URL}/accounts/auth/login'

UserModel = get_user_model()


class GetUserApi(APIView):
    """
    Determine current user. Return user name, email 
    and profile image
    """
    permission_classes = [AllowAny]

    def get(self, request, *args, **kwargs):
        if request.user.is_authenticated:
            return Response(get_user_info(user=request.user))
        return Response(status=status.HTTP_204_NO_CONTENT)


class GoogleLoginAPI(APIView):
    """
    Manage login with Google
    Get token from request and obtain user information: email, 
    user name and profile image
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
            return redirect(f'{LOGIN_URL}?error')

        redirect_uri = f'{LOGIN_URL}/google'
        access_token = google_obtain_access_token(
            code=code, redirect_uri=redirect_uri)

        user_info = google_get_user_info(access_token)

        profile_data = {
            'first_name': user_info.get('given_name'),
            'last_name': user_info.get('family_name'),
            'email': user_info.get('email'),
            'profile_image': user_info.get('picture'),
        }

        user = user_get_or_create(profile_data)

        res = redirect(BASE_FRONTEND_URL)
        res = jwt_login(response=res, user=user)
        return res


class LogoutAPI(APIView):
    """
    Log out user by removing JWT cookie header
    """
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        response = Response(status=status.HTTP_202_ACCEPTED)
        params = {
            'expires': 'Thu, 01 Jan 1970 00:00:00 GMT',
            'domain': api_settings.JWT_AUTH_COOKIE_DOMAIN,
            'path': api_settings.JWT_AUTH_COOKIE_PATH,
            'secure': api_settings.JWT_AUTH_COOKIE_SECURE,
            'samesite': api_settings.JWT_AUTH_COOKIE_SAMESITE,
            'httponly': True
        }
        response.set_cookie(api_settings.JWT_AUTH_COOKIE, **params)
        return response


class SignUpUserApi(CreateAPIView):
    """
    Create new user with email and password and log user in
    """
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)

        email = serializer.data['email']
        user = UserModel.objects.get(email=email)

        res = Response(serializer.data, status=status.HTTP_201_CREATED)
        res = jwt_login(response=res, user=user)

        return res
