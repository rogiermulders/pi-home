from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from ..models import Pin
from ..serializers import PinSerializer


class Index(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response(PinSerializer(Pin.objects.all(), many=True).data)

    def put(self, request):

        pin = get_object_or_404(Pin, pk=request.data.get('id'))
        pin.status = not pin.status
        pin.save()
        return Response(PinSerializer(pin).data)
