from rest_framework.response import Response
from rest_framework import status

class ApiResponseMixin:
    def success_response(self, data, message="Success", status_code=status.HTTP_200_OK, headers=None):
        return Response(
            {
                "success": True,
                "message": message,
                "data": data,
            },
            status=status_code,
            headers=headers
        )

    def error_response(self, message="Error", status_code=status.HTTP_400_BAD_REQUEST, errors=None):
        return Response(
            {
                "success": False,
                "message": message,
                "errors": errors,
            },
            status=status_code
        )
