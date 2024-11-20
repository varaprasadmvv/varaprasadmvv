from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import viewsets, permissions
from rest_framework.response import Response
from .models import Employees, Project, ProjectManager
from .serializers import EmployeesSerializer, ProjectManagerSerializer, ProjectSerializer




def home(request):
    return HttpResponse('hello django aplication')
class ProjectManagerViewset(viewsets.ModelViewSet):
    permission_classes = [permissions.AllowAny]
    queryset = ProjectManager.objects.all()
    serializer_class = ProjectManagerSerializer
    
    def list(self, request):
        queryset = ProjectManager.objects.all()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)


class EmployeesViewset(viewsets.ModelViewSet):
    permission_classes = [permissions.AllowAny]
    queryset = Employees.objects.all()
    serializer_class = EmployeesSerializer
    
    def list(self, request):
        queryset = Employees.objects.all()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)



class ProjectViewset(viewsets.ModelViewSet):
    permission_classes = [permissions.AllowAny]
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    
    def list(self, request):
        queryset = Project.objects.all()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)
    

    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=400)

    def retrieve(self, request, pk=None):
        project = self.queryset.get(pk=pk)
        serilaizer = self.serializer_class(project)
        return Response(serilaizer.data)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        project = self.get_object()
        serializer = self.serializer_class(project, data=request.data, partial=partial)
        if serializer.is_valid(raise_exception=True):
            self.perform_update(serializer)
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def perform_update(self, serializer):
        serializer.save()

  

    def destroy(self, request, pk=None):
        project = self.queryset.get(pk=pk)
        project.delete()
        return Response(status=204)