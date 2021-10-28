from django.urls import path, re_path
from .views import index
urlpatterns = [
    path('', index),
    path('favorite', index),
    path('suggest-course', index),
    path('about', index),
    path('login', index),
    path('signup', index),
    re_path(r'reset-password/(.)+', index),
    path('reset-password/', index),
    path('reset-password-done/', index),
]
