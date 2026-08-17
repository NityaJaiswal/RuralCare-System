from django.contrib import admin
from django.urls import include, path


urlpatterns = [
    path("admin/", admin.site.urls),

    # Authentication API
    path("api/auth/", include("accounts.urls")),

    # Consultation API
    path(
        "api/consultations/",
        include("consultations.urls"),
    ),
]