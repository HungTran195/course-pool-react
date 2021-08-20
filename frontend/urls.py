from django.urls import path
from .views import index
urlpatterns = [
    path('', index),
    path('favorite', index),
    path('suggest-course', index),
    path('about', index),
]
