from django.db import models
from django.contrib.auth.models import AbstractUser, Permission

# Create your models here.

class User(AbstractUser):
    username= models.CharField(max_length=100)
    email= models.EmailField(unique=True)
    groups = models.ManyToManyField('auth.Group', related_name='task_manager_users')
    user_permissions = models.ManyToManyField('auth.Permission', related_name='task_manager_user_permissions')
    
    def __str__(self): 
        return f"{self.username}, {self.email}"
    
class Task(models.Model):
    priorities = [(1,'alta'), (2,'media'), (3,'baja')]

    task_name= models.CharField(max_length=100)
    inicial_date= models.DateField(auto_now_add=True)
    final_date= models.DateField()
    assigned_user= models.ForeignKey(User, on_delete=models.CASCADE)
    task_description= models.TextField()
    priority= models.IntegerField(choices=priorities, default=2)
    status= models.BooleanField(default= False)

    def __str__(self):
        return f"{self.task_name}, {self.inicial_date}, {self.assigned_user}, {self.task_description}, {self.priority}, {self.status}"