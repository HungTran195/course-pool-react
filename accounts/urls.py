
from django.urls import path, include, re_path
from .views import GoogleLoginAPI, GetUserApi, LogoutAPI
from rest_framework_jwt.views import obtain_jwt_token, refresh_jwt_token

urlpatterns = [
    re_path(r'auth/login/google', GoogleLoginAPI.as_view()),
    path('auth/logout', LogoutAPI.as_view()),
    path('auth/get-current-user', GetUserApi.as_view()),
    path('auth/login', obtain_jwt_token),
    path('auth/api_token_refresh', refresh_jwt_token),
]
