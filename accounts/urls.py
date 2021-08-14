
from django.urls import path, include, re_path
from .views import GoogleLoginAPI, GetUserApi

urlpatterns = [
    re_path(r'auth/login/google', GoogleLoginAPI.as_view()),
    path('auth/get-current-user', GetUserApi.as_view()),
]
