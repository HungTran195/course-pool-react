from django.db.models import query
from django.http.response import HttpResponse, HttpResponseServerError
from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import CourseSerializer
from .models import Course
# Create your views here.


class CourseView(generics.ListAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    def get(self, request):
        all_course = Course.objects.all()
        data = CourseSerializer(all_course,many=True).data
        # data = CourseSerializer(all_course[0]).data
        return Response(data, status = status.HTTP_200_OK)


class AddCourseView(APIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
