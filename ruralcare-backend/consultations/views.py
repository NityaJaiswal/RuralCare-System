from django.shortcuts import get_object_or_404

from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import ConsultationCase, AIMessage
from .serializers import (
    ConsultationCaseSerializer,
    AIMessageSerializer,
)


class ConsultationCaseListCreateView(APIView):
    """
    GET  -> List the authenticated patient's cases.
    POST -> Create a new consultation case.
    """

    permission_classes = [IsAuthenticated]

    def get(self, request):
        cases = ConsultationCase.objects.filter(
            patient=request.user
        ).prefetch_related("ai_messages")

        serializer = ConsultationCaseSerializer(
            cases,
            many=True,
            context={"request": request},
        )

        return Response(serializer.data)

    def post(self, request):
        serializer = ConsultationCaseSerializer(
            data=request.data,
            context={"request": request},
        )

        if serializer.is_valid():
            case = serializer.save(patient=request.user)

            return Response(
                ConsultationCaseSerializer(
                    case,
                    context={"request": request},
                ).data,
                status=status.HTTP_201_CREATED,
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST,
        )


class ConsultationCaseDetailView(APIView):
    """
    GET    -> View one patient's case.
    PATCH  -> Update a patient's case.
    DELETE -> Delete a patient's case.
    """

    permission_classes = [IsAuthenticated]

    def get_case(self, request, case_id):
        return get_object_or_404(
            ConsultationCase,
            id=case_id,
            patient=request.user,
        )

    def get(self, request, case_id):
        case = self.get_case(request, case_id)

        serializer = ConsultationCaseSerializer(
            case,
            context={"request": request},
        )

        return Response(serializer.data)

    def patch(self, request, case_id):
        case = self.get_case(request, case_id)

        serializer = ConsultationCaseSerializer(
            case,
            data=request.data,
            partial=True,
            context={"request": request},
        )

        if serializer.is_valid():
            serializer.save()

            return Response(serializer.data)

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST,
        )

    def delete(self, request, case_id):
        case = self.get_case(request, case_id)
        case.delete()

        return Response(
            status=status.HTTP_204_NO_CONTENT
        )


class AIMessageCreateView(APIView):
    """
    Add a patient/AI message to a consultation case.
    """

    permission_classes = [IsAuthenticated]

    def post(self, request, case_id):
        case = get_object_or_404(
            ConsultationCase,
            id=case_id,
            patient=request.user,
        )

        serializer = AIMessageSerializer(
            data=request.data
        )

        if serializer.is_valid():
            message = serializer.save(case=case)

            return Response(
                AIMessageSerializer(message).data,
                status=status.HTTP_201_CREATED,
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST,
        )