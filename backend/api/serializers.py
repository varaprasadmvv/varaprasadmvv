from rest_framework import serializers
from .models import Employees, Project, ProjectManager

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'


class ProjectManagerSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = ProjectManager
        fields = ('name','id')

class EmployeesSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Employees
        fields = ('name','id')
