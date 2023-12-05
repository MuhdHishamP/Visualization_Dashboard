from django.shortcuts import render
from .models import dash
from .serializers import dash_serializer
from rest_framework import viewsets

# Create your views here.

class dash_view(viewsets.ModelViewSet):
    queryset = dash.objects.all()
    serializer_class = dash_serializer