from django.urls import path
from .views import TaskView,RegistrationView,UpdateTaskView,IndexView, CreateTaskView, DeleteTaskView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('taskmanager/token/',TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('taskmanager/token/refresh/',TokenRefreshView.as_view(), name='token_refresh'),
    path('', IndexView.as_view(), name='index'),
    path('taskmanager/register/',RegistrationView.as_view(), name='register'),
    path('taskmanager/tasks/',TaskView.as_view(), name='tasks'),
    path('taskmanager/create_task/',CreateTaskView.as_view(), name='create_task'),
    path('taskmanager/update_task/<int:id>',UpdateTaskView.as_view(), name='update_task'),
    path('taskmanager/delete_task/<int:id>',DeleteTaskView.as_view(), name='delete_task'),    
]