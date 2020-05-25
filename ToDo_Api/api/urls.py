from django.urls import path,include
from rest_framework import routers
from .views import TaskViewSet, UserViewSet

router = routers.DefaultRouter()
router.register('tasks',TaskViewSet)
router.register('users',UserViewSet)

urlpatterns = [
    path('', include(router.urls)),
]