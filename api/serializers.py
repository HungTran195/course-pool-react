from django.db import models
from django.db.models import fields
from rest_framework import serializers
from .models import Course, Suggest_Course, Your_Course
from django.contrib.auth import get_user_model

UserModel = get_user_model()


class CourseSerializer(serializers.ModelSerializer):
    is_favorite = serializers.SerializerMethodField()

    class Meta:
        model = Course
        fields = ('id', 'course_name', 'author', 'url',
                  'thumbnail_url', 'description', 'tags', 'is_favorite')

    def get_is_favorite(self, course):
        user = self.context['request'].user
        if user.is_authenticated:
            course_id = course.id
            if Your_Course.objects.filter(user=user).filter(course_id=course_id):
                return True

        return False

class AddCourseSerializer(serializers.ModelSerializer):

    class Meta:
        model = Suggest_Course
        fields =('name', 'email', 'course_name', 'course_url', 'description')


class FavoriteCourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Your_Course
        fields = ('course', )
