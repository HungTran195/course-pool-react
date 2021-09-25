from django.urls import path
from .views import CourseView, AddNewCourseView, GetFavoriteCourseAPI, ToggleFavoriteAPI

urlpatterns = [
    path('view-course', CourseView.as_view()),
    path('add-course', AddNewCourseView.as_view()),
    path('toggle-favorite', ToggleFavoriteAPI.as_view()),
    path('get-favorite', GetFavoriteCourseAPI.as_view()),

]
