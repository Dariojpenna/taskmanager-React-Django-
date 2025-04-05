from django.http import HttpResponse
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from .models import User, Task
from .serializers import TaskSerializer,Task
# Create your views here.
class IndexView(APIView):
    permission_classes = [AllowAny]

    def get(self,request):
        return Response (status.HTTP_200_OK, )
    
class RegistrationView(APIView):
    permission_classes = [AllowAny]

    def post(self,request):
        if User.objects.filter(username=request.data['username']).exists():
            return Response({'message':'Username already exist'}, status=400)
        if User.objects.filter(email=request.data['email']).exists():
            return Response({'message':'Email already exist'}, status=400)
        
        user=User.objects.create_user(
            username=request.data['username'],
            email=request.data['email'],
            password=request.data['password'])
            
        return Response({"message": "User created successfully"},status.HTTP_200_OK)
    
class TaskView(APIView):
    
    def get(self,request):
        
        if Task.objects.filter(assigned_user=request.user.id):
            tasks= Task.objects.filter(assigned_user=request.user.id)
            taskSerializer = TaskSerializer(tasks,many=True)
            return Response(taskSerializer.data, status.HTTP_200_OK, )
        return Response({"message": "There is not tasks yet"},status.HTTP_200_OK )
    
class taskDetailView(APIView):
    
    def get(seld,request,id):
        getTask = Task.objects.get(id=id)
        
        taskSerializer = TaskSerializer(getTask)
        
        return Response(taskSerializer.data,status.HTTP_200_OK, )
class CreateTaskView(APIView):
    def post(self,request):
        
        newTask = Task.objects.create(
            task_name=request.data['task_name'], 
            inicial_date= request.data['inicial_date'],
            final_date= request.data['final_date'],
            assigned_user= request.user,
            task_description= request.data['task_description'],
            priority= request.data['priority']
        )

        return Response({"message": "Task created successfully"},status.HTTP_200_OK)
    
class UpdateTaskView(APIView):
    def post(self,request,id):
        task = Task.objects.get(id=id)
        newStatus = not task.status
        task.status = newStatus
        task.save()
        
        return Response({"message": "Task updated successfully"}, status.HTTP_200_OK)
class DeleteTaskView(APIView):
    def post(self,request,id):
        task = Task.objects.get(id=id)
        task.delete()
        tasks= Task.objects.filter(assigned_user=request.user.id)
        taskSerializer = TaskSerializer(tasks,many=True)
        return Response(taskSerializer.data, status.HTTP_200_OK, )

    
