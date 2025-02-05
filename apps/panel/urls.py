from django.urls import path

from .views import AdminTaskDetailView, AdminTaskListView

app_name = "panel"

urlpatterns = [
    path("tasks/", AdminTaskListView.as_view(), name="task-list"),
    path("tasks/<int:pk>/", AdminTaskDetailView.as_view(), name="task-detail"),
]
