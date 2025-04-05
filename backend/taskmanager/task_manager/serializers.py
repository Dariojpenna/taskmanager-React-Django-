from rest_framework import serializers
from .models import Task, User

class UserSerializer(serializers.ModelSerializer):
    class Meta: 
        model = User
        fields = '__all__'

class TaskSerializer(serializers.ModelSerializer):
    assigned_user = UserSerializer()
    priority_display = serializers.SerializerMethodField()
    class Meta:
        model = Task
        fields= '__all__'
        extra_fields = ['priority_display'] 

    def get_priority_display(self,obj):
        return obj.get_priority_display()