from django.urls import path
from .controllers import lightning, home

urlpatterns = [
    path('home', home.Index.as_view(), name='home'),
    path('lightning', lightning.Index.as_view(), name='lightning'),
]