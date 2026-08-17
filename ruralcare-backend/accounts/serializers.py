from django.contrib.auth.models import User
from rest_framework import serializers

from .models import PatientProfile


class PatientProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = PatientProfile
        fields = [
            "phone",
            "date_of_birth",
            "gender",
            "created_at",
            "updated_at",
        ]
        read_only_fields = [
            "created_at",
            "updated_at",
        ]


class UserSerializer(serializers.ModelSerializer):
    patient_profile = PatientProfileSerializer(
        read_only=True
    )

    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "first_name",
            "last_name",
            "email",
            "patient_profile",
        ]
        read_only_fields = ["id"]