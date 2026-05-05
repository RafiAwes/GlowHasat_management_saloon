from django.contrib import admin
from .models import Staff

@admin.register(Staff)
class StaffAdmin(admin.ModelAdmin):
    list_display = ("user", "title", "is_active", "created_at")
    search_fields = ("user__email", "user__first_name", "user__last_name", "title")
    list_filter = ("is_active",)

