from rest_framework import serializers
from .models import Course, Your_Course
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


class FavoriteCourse(serializers.ModelSerializer):
    class Meta:
        model = Your_Course
        fields = ('course', )
