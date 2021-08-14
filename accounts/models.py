from .managers import CustomUserManager
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.management.utils import get_random_secret_key

DEFAULT_PROFILE_PICTURE_URL = 'http://defaultprofil.com'


class User(AbstractUser):
    """
    Custom User model used to store email as username, account picture url
    and secret key for verification
    """
    username = None

    email = models.EmailField(unique=True, db_index=True)
    picture_url = models.URLField(
        default=DEFAULT_PROFILE_PICTURE_URL, null=True, blank=True)
    secret_key = models.CharField(
        max_length=255, default=get_random_secret_key)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    def __str__(self):
        return self.email

    @property
    def name(self):
        if not self.last_name:
            return self.first_name.capitalize()

        return f'{self.first_name.capitalize()} {self.last_name.capitalize()}'
