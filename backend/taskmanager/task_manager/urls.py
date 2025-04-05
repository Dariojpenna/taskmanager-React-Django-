from django.urls import path
from .views import TaskView,RegistrationView,UpdateTaskView,IndexView, CreateTaskView, DeleteTaskView, taskDetailView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView


urlpatterns = [
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('', IndexView.as_view(), name='index'),
    path('register/',RegistrationView.as_view(), name='register'),
    path('tasks/',TaskView.as_view(), name='tasks'),
    path('task_detail/<int:id>',taskDetailView.as_view(), name='task_detail'),
    path('create_task/',CreateTaskView.as_view(), name='create_task'),
    path('update_task/<int:id>',UpdateTaskView.as_view(), name='update_task'),
    path('delete_task/<int:id>',DeleteTaskView.as_view(), name='delete_task'),    
]
