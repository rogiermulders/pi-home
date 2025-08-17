from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Pin
from .serializers import PinSerializer


class HomeView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({"message": "This is a protected route"})


class LightningView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response(PinSerializer(Pin.objects.all(), many=True).data)
