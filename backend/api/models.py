from django.db import models

class ProjectManager(models.Model):
    name = models.CharField(unique=True,max_length=100)
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)
    def __str__(self):
        return self.name
    
class Employees(models.Model):
    name = models.CharField(unique=True,max_length=100)
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)
    def __str__(self):
        return self.name



class Project(models.Model):
    name = models.CharField(max_length=255)
    projectmanager = models.ForeignKey(ProjectManager, on_delete=models.SET_NULL, null=True, blank=True)
    employees = models.ManyToManyField(Employees)
    start_date = models.DateField()
    end_date = models.DateField()
    comments = models.TextField()
    status = models.CharField(max_length=50)
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
