from django.shortcuts import render, redirect
from django.http import HttpResponse
from rest_framework.views import APIView
from rest_framework import serializers
from .utils import google_obtain_access_token, google_get_user_info, user_get_or_create, jwt_login, get_user_info
from rest_framework.response import Response

BASE_URL = 'http://127.0.0.1:8000'
LOGIN_URL = f'{BASE_URL}/accounts/auth/login'


class GetUserApi(APIView):
    """
    Determine current user. Return user name, email 
    and profile picture URL
    """

    def get(self, request, *args, **kwargs):
        return Response(get_user_info(user=request.user))


class GoogleLoginAPI(APIView):
    """
    Manage login with Google
    Get token from request and obtain user information: email, 
    user name and profile picture url
    """
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
