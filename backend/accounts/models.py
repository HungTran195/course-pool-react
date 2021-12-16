
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.management.utils import get_random_secret_key
from django.conf import settings
from .managers import CustomUserManager


DEFAULT_PROFILE_PICTURE_URL = settings.DEFAULT_PROFILE_PICTURE_URL


class User(AbstractUser):
    """
    Custom User model used to store email as username, profile image
    and secret key for verification
    """
    username = None

    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    email = models.EmailField(unique=True, db_index=True)
    profile_image = models.URLField(
        default=DEFAULT_PROFILE_PICTURE_URL, null=True, blank=True)
    secret_key = models.CharField(
        max_length=255, default=get_random_secret_key)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    objects = CustomUserManager()

    def __str__(self):
        return self.email

    @property
    def name(self):
        if not self.last_name:
            return self.first_name.capitalize()

        return f'{self.first_name.capitalize()} {self.last_name.capitalize()}'
