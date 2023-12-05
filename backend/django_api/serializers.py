from rest_framework import serializers
from .models import dash

class dash_serializer(serializers.ModelSerializer):
    class Meta:
        model = dash
        fields = '__all__'