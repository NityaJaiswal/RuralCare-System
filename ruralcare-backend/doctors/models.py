from django.contrib.auth.models import User
from django.db import models


class DoctorProfile(models.Model):
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name="doctor_profile",
    )

    specialization = models.CharField(
        max_length=100,
        blank=True,
    )

    license_number = models.CharField(
        max_length=100,
        blank=True,
    )

    is_available = models.BooleanField(
        default=True,
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
    )

    def __str__(self):
        return self.user.get_full_name() or self.user.username


class DoctorReview(models.Model):

    case = models.OneToOneField(
        "consultations.ConsultationCase",
        on_delete=models.CASCADE,
        related_name="doctor_review",
    )

    doctor = models.ForeignKey(
        DoctorProfile,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="reviews",
    )

    assessment = models.TextField(
        blank=True,
    )

    precautions = models.TextField(
        blank=True,
    )

    medications = models.TextField(
        blank=True,
    )

    follow_up = models.TextField(
        blank=True,
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
    )

    updated_at = models.DateTimeField(
        auto_now=True,
    )

    def __str__(self):
        return f"Doctor Review - Case #{self.case.id}"