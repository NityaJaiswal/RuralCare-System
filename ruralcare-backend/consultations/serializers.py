from rest_framework import serializers

from .models import ConsultationCase, AIMessage


class AIMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = AIMessage
        fields = [
            "id",
            "case",
            "sender",
            "text",
            "created_at",
        ]

        read_only_fields = [
            "id",
            "created_at",
        ]


class ConsultationCaseSerializer(serializers.ModelSerializer):
    messages = AIMessageSerializer(
        source="ai_messages",
        many=True,
        read_only=True,
    )

    patient_username = serializers.CharField(
        source="patient.username",
        read_only=True,
    )

    class Meta:
        model = ConsultationCase

        fields = [
            "id",
            "patient",
            "patient_username",
            "symptoms",
            "photo",
            "status",
            "ai_summary",
            "doctor_response",
            "doctor_plan",
            "messages",
            "created_at",
            "updated_at",
        ]

        read_only_fields = [
            "id",
            "patient",
            "patient_username",
            "status",
            "ai_summary",
            "doctor_response",
            "doctor_plan",
            "messages",
            "created_at",
            "updated_at",
        ]