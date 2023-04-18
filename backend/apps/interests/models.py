from django.db import models
from apps.clients.models import Client
from apps.interests.manager.interests import InterestsManager


def content_file_name(instance, filename):
    return '/'.join(['static_files', filename])

class Interests(models.Model):
    
    INTERESTS_TYPE = (
        ('casa','casa'),
        ('apartamento','apartamento')
    )
    objects = InterestsManager()
    client = models.ForeignKey(Client, on_delete=models.CASCADE, related_name='client')
    place = models.CharField(max_length=250)
    size = models.CharField(max_length=250, null=True, blank=True)
    value = models.CharField(max_length=250)
    type = models.CharField(max_length=250, choices=INTERESTS_TYPE, default='casa')
    furnished = models.BooleanField(default=False)
    pets = models.BooleanField(default=False)
    pool = models.BooleanField(default=False)
    morning_sun = models.BooleanField(default=False)
    guarantor = models.BooleanField(default=False)
    file = models.FileField( blank=True, null=True, upload_to=content_file_name)
    latitude = models.DecimalField(max_digits=9, decimal_places=6,blank=True, null=True)
    longitude = models.DecimalField(max_digits=9, decimal_places=6,blank=True, null=True)
    
    
    class Meta:
        db_table = 'interests'
