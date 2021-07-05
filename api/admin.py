from django.contrib import admin
from .models import Course, Your_Course, Suggest_Course
# Register your models here.
admin.site.register(Course)
admin.site.register(Your_Course)
admin.site.register(Suggest_Course)
