
from django.urls import path, include, re_path
from .views import GoogleLoginAPI, GetUserApi, LogoutAPI, SignUpUserApi
from rest_framework_jwt.views import obtain_jwt_token, refresh_jwt_token

urlpatterns = [
    path('auth/get-current-user', GetUserApi.as_view()),
    re_path(r'auth/login/google', GoogleLoginAPI.as_view()),
    path('auth/login', obtain_jwt_token),
    path('auth/logout', LogoutAPI.as_view()),
    path('auth/signup', SignUpUserApi.as_view()),
    path('auth/api_token_refresh', refresh_jwt_token),
    re_path(r'^auth/', include('djoser.urls')),
    re_path(r'^auth/', include('djoser.urls.authtoken')),
]

