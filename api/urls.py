from django.urls import path
from .views import CourseView, AddCourseView

urlpatterns = [
    path('view-course', CourseView.as_view()),
    path('add-course', AddCourseView.as_view()),

]
