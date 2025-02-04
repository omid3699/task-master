from django.urls import path

from .views import TaskDetailView, TaskListCreateView

app_name = "tasks"

urlpatterns = [
    path("", TaskListCreateView.as_view(), name="task-list"),
    path("<int:pk>/", TaskDetailView.as_view(), name="task-detail"),
]
