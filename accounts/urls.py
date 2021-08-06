
from django.urls import path, include
from .import views
# import GoogleLogin from accounts.views

urlpatterns = [
    path("", views.index),
]
