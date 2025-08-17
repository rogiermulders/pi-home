# api/serializers.py
from rest_framework import serializers
from .models import Pins

class PinsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pins
        fields = '__all__'