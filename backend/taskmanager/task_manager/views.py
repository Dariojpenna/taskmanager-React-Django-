from django.http import HttpResponse
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from .models import User, Task
# Create your views here.
class IndexView(APIView):
    def get(self,request):
        return Response (status.HTTP_200_OK, )
    
class RegistrationView(APIView):
    def post(self,request):
        if User.objects.filter(request.data['username']).exists():
            return Response({'message':'Username already exist'}, status=400)
        if User.objects.filter(request.data(['email'])).exists():
            return Response({'message':'Email already exist'}, status=400)
        
        user=User.objects.create_user(
            username=request.data['username'],
            email=request.data['emal'])
        return Response(status.HTTP_200_OK, data={"message": "User created successfully"})
    
class TaskView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes =[IsAuthenticated]

    def get(self,request):
        if Task.objects.filter(asigned_user=request.data['username']):
            tasks= Task.objects.filter(asigned_user=request.data['username'])
            return Response(status.HTTP_200_OK, tasks)
        return Response(status.HTTP_200_OK, data={"message": "There is not tasks yet"})
    
class CreateTaskView(APIView):
    def post(self,request):
        return Response(status.HTTP_200_OK, data={"message": "Task created successfully"})
    
class UpdateTaskView(APIView):
    def post(self,request):
        return Response(status.HTTP_200_OK, data={"message": "Task updated successfully"})
class DeleteTaskView(APIView):
    def post(self,request):
        return Response(status.HTTP_200_OK, data={'message':'Task deleted successfuly'})
    
