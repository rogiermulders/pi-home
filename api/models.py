from django.db import models

class Pins(models.Model):
    pin = models.IntegerField()
    name = models.CharField(max_length=10, blank=True, null=True)
    function = models.CharField(max_length=100, blank=True, null=True)
    status = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)