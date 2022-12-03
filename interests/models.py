from django.db import models
from clients.models import Client


def content_file_name(instance, filename):
    return '/'.join(['static_files', filename])

class Interests(models.Model):
    
    INTERESTS_TYPE = (
        ('casa','casa'),
        ('apartamento ','apartamento')
    )
    
    client_id = models.ForeignKey(Client, on_delete=models.CASCADE, related_name='client')
    place = models.CharField(max_length=250)
    size = models.CharField(max_length=250, null=True, blank=True)
    value = models.CharField(max_length=250)
    type = models.CharField(max_length=250, choices=INTERESTS_TYPE, default='casa')
    furnished = models.BooleanField(default=False)
    pets = models.BooleanField(default=False)
    pool = models.BooleanField(default=False)
    morning_sun = models.BooleanField(default=False)
    guarantor = models.BooleanField(default=False)
    file = models.FileField(upload_to=content_file_name)
    
    
    class Meta:
        db_table = 'interests'
