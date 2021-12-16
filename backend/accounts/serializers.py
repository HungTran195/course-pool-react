from django.contrib.auth.models import User
from rest_framework import serializers
from django.contrib.auth import get_user_model
from rest_framework.utils import model_meta

UserModel = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    '''
    A class for serialize data when create new user
    '''
    password = serializers.CharField(write_only=True)

    def create(self, validated_data):
        user = super(UserSerializer, self).create(validated_data)
        user.set_password(validated_data['password'])
        user.save()
        return user

    class Meta:
        model = UserModel
        fields = ('email', 'password', 'first_name', 'last_name',)
