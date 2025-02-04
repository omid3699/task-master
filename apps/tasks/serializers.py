from django.utils import timezone
from rest_framework import serializers

from .models import Task


class TaskSerializer(serializers.ModelSerializer):
    is_overdue = (
        serializers.ReadOnlyField()
    )  # Read-only field for checking overdue tasks

    class Meta:
        model = Task
        fields = [
            "id",
            "title",
            "description",
            "status",
            "due_date",
            "created_at",
            "updated_at",
            "is_overdue",
        ]
        read_only_fields = ["created_at", "updated_at", "is_overdue"]

    def validate_due_date(self, value):
        """
        Validate that due_date is in the future.
        """
        if value <= timezone.now():
            raise serializers.ValidationError("Due date must be in the future.")
        return value
