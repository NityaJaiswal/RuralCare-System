from django.contrib.auth.models import User
from django.db import models


class ConsultationCase(models.Model):

    STATUS_CHOICES = [
        ("DRAFT", "Draft"),
        ("AI_REVIEWING", "AI Reviewing"),
        ("SENT_TO_DOCTOR", "Sent to Doctor"),
        ("WAITING_FOR_DOCTOR", "Waiting for Doctor"),
        ("DOCTOR_RESPONDED", "Doctor Responded"),
        ("COMPLETED", "Completed"),
    ]

    patient = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="consultation_cases",
    )

    symptoms = models.TextField()

    photo = models.ImageField(
        upload_to="consultation_photos/",
        blank=True,
        null=True,
    )

    status = models.CharField(
        max_length=30,
        choices=STATUS_CHOICES,
        default="DRAFT",
    )

    ai_summary = models.JSONField(
        blank=True,
        null=True,
    )

    doctor_response = models.JSONField(
        blank=True,
        null=True,
    )

    doctor_plan = models.JSONField(
        blank=True,
        null=True,
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
    )

    updated_at = models.DateTimeField(
        auto_now=True,
    )

    def __str__(self):
        return f"Case #{self.id} - {self.patient.username}"


class AIMessage(models.Model):

    SENDER_CHOICES = [
        ("patient", "Patient"),
        ("ai", "AI Assistant"),
    ]

    case = models.ForeignKey(
        ConsultationCase,
        on_delete=models.CASCADE,
        related_name="ai_messages",
    )

    sender = models.CharField(
        max_length=20,
        choices=SENDER_CHOICES,
    )

    text = models.TextField()

    created_at = models.DateTimeField(
        auto_now_add=True,
    )

    class Meta:
        ordering = ["created_at"]

    def __str__(self):
        return f"{self.sender} - Case #{self.case.id}"