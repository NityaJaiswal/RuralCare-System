from rest_framework import serializers

from .models import DoctorProfile, DoctorReview


class DoctorProfileSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField()

    class Meta:
        model = DoctorProfile
        fields = [
            "id",
            "name",
            "specialization",
            "license_number",
            "is_available",
            "created_at",
        ]
        read_only_fields = [
            "id",
            "name",
            "created_at",
        ]

    def get_name(self, obj):
        return obj.user.get_full_name() or obj.user.username


class DoctorReviewSerializer(serializers.ModelSerializer):
    doctor_name = serializers.SerializerMethodField()

    class Meta:
        model = DoctorReview
        fields = [
            "id",
            "case",
            "doctor",
            "doctor_name",
            "assessment",
            "precautions",
            "medications",
            "follow_up",
            "created_at",
            "updated_at",
        ]
        read_only_fields = [
            "id",
            "doctor_name",
            "created_at",
            "updated_at",
        ]

    def get_doctor_name(self, obj):
        if obj.doctor:
            return (
                obj.doctor.user.get_full_name()
                or obj.doctor.user.username
            )

        return None