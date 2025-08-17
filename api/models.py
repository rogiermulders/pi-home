from django.db import models

class Choice(models.Model):
    pin = models.IntegerField()
    status = models.booleanField(default=False)
