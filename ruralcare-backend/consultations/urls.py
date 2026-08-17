from django.urls import path

from .views import (
    ConsultationCaseListCreateView,
    ConsultationCaseDetailView,
    AIMessageCreateView,
)


urlpatterns = [
    path(
        "",
        ConsultationCaseListCreateView.as_view(),
        name="consultation-list-create",
    ),

    path(
        "<int:case_id>/",
        ConsultationCaseDetailView.as_view(),
        name="consultation-detail",
    ),

    path(
        "<int:case_id>/messages/",
        AIMessageCreateView.as_view(),
        name="ai-message-create",
    ),
]