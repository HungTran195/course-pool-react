from django.urls import path
from .views import CourseView, AddCourseView

urlpatterns = [
    path('view_course', CourseView.as_view()),
    path('add_course', AddCourseView.as_view()),

]
