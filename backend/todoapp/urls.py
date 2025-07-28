"""
URL configuration for todoapp project.
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from todos import views

router = routers.DefaultRouter()
router.register(r"todos", views.TodoViewSet)

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include(router.urls)),
]
