from django.urls import path, re_path
from .views import CourseView, AddNewCourseView, GetFavoriteCourseAPI, ToggleFavoriteAPI

urlpatterns = [
    re_path(r'^view-course/(?P<keywords>.+)?', CourseView.as_view()),
    path('add-course', AddNewCourseView.as_view()),
    path('toggle-favorite', ToggleFavoriteAPI.as_view()),
    path('get-favorite', GetFavoriteCourseAPI.as_view()),

]
