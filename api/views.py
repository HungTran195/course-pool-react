from rest_framework import generics, serializers, status
from rest_framework.response import Response
from .serializers import CourseSerializer, FavoriteCourseSerializer, AddCourseSerializer
from .models import Course, Suggest_Course, Your_Course
from rest_framework.permissions import IsAuthenticated
from django.db.models import Q
from rest_framework.exceptions import ValidationError


class CourseView(generics.ListAPIView):

    serializer_class = CourseSerializer

    def get(self, request, *args, **kwargs):
        queryset = Course.objects.all()

        search_keywords = request.query_params.get('keywords')
        if search_keywords is not None:
            queryset = queryset.filter(
                Q(course_name__icontains=search_keywords) | Q(tags__icontains=search_keywords))

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class GetFavoriteCourseAPI(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = CourseSerializer

    def get(self, request):
        user = request.user

        if user.is_authenticated:
            queryset = Course.objects.filter(your_course__user=user)
            serializer = self.get_serializer(queryset, many=True)
            return Response(serializer.data)

        return Response(status=status.HTTP_401_UNAUTHORIZED)


class AddNewCourseView(generics.CreateAPIView):
    queryset = Suggest_Course
    serializer_class = AddCourseSerializer

    def post(self, request):
        serializer = self.get_serializer(data=request.data)

        serializer.is_valid(raise_exception=True)

        course = Suggest_Course.objects.filter(
            course_url=serializer.validated_data['course_url'])
        if not course:
            self.perform_create(serializer)

        return Response(status=status.HTTP_201_CREATED)


class ToggleFavoriteAPI(generics.ListCreateAPIView):
    queryset = Your_Course
    serializer_class = FavoriteCourseSerializer
    permissions_class = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        course_id = serializer.data.get('course')
        if request.user:
            favorite_model = self.queryset
            favorate_course = favorite_model.objects.filter(
                user=request.user).filter(course_id=course_id)
            if favorate_course:
                favorate_course.delete()
            else:
                q = favorite_model(
                    user=request.user,
                    course_id=course_id
                )
                q.clean()
                q.save()
            return Response(status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
