from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import EmployeesViewset, ProjectViewset,ProjectManagerViewset

router = DefaultRouter()
router.register('project', ProjectViewset, basename='project')
router.register('projectmanager', ProjectManagerViewset, basename='projectmanager')
router.register('employees', EmployeesViewset, basename='employees')

urlpatterns = [
    path('', include(router.urls)),
]
