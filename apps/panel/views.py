# Create your views here.
from drf_spectacular.utils import extend_schema
from rest_framework import generics, permissions

from apps.tasks.models import Task
from apps.tasks.serializers import TaskSerializer


class AdminTaskListView(generics.ListAPIView):
    """
    Admin view to list all tasks.
    """

    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    permission_classes = [permissions.IsAdminUser]

    @extend_schema(summary="List all tasks (Admin Only)")
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)


class AdminTaskDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    Admin view to retrieve, update, or delete a task.
    """

    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    permission_classes = [permissions.IsAdminUser]

    @extend_schema(summary="Retrieve, update, or delete a task (Admin Only)")
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)
