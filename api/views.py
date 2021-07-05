from django.http.response import HttpResponseServerError
from django.shortcuts import render
from rest_framework import generics
from .serializers import CourseSerializer
from .models import Course
# Create your views here.


class CourseView(generics.ListAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer


class AddCourseView(generics.CreateAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
