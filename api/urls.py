from django.urls import path
from .protected_views import HomeView, LightningView

urlpatterns = [
    path('home', HomeView.as_view(), name='home'),

    path('lightning', LightningView.as_view(), name='lightning'),
]