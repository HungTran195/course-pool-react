from django.contrib import admin

from django.contrib.auth.admin import UserAdmin
from django.utils.translation import gettext_lazy as _

from accounts.models import User
from .forms import CustomUserChangeForm, CustomUserCreationForm


@admin.register(User)
class UserAdmin(UserAdmin):
    """
    Custom user admin forms
    # Ref: https://docs.djangoproject.com/en/3.2/topics/auth/customizing/#a-full-example    
    """
    add_form = CustomUserCreationForm
    form = CustomUserChangeForm
    model = User
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        (_('Personal info'), {
         'fields': ('first_name', 'last_name', 'picture_url')}),
        (_('Permissions'), {'fields': (
            'is_active',
            'is_staff',
            'is_superuser',
        )}),
        (_('Important dates'), {'fields': ('last_login', 'date_joined')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'first_name', 'last_name', 'picture_url', 'password1', 'password2', 'is_staff', 'is_active'),
        }),
    )
    ordering = ('email', )
    list_display = ('email', 'first_name', 'last_name', 'is_staff')
    search_fields = ('email', 'first_name', 'last_name')
