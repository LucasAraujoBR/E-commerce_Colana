from django.db import models

class Client(models.Model):
    
    CLIENT_TYPE = (
        ('inquilino','inquilino'),
        ('proprietário ','proprietário ')
    )
    
    name = models.CharField(max_length=250, null=True, blank=True)
    type = models.CharField(max_length=250, choices=CLIENT_TYPE, default='inquilino', null=True, blank=True)
    secret = models.CharField(max_length=250, null=True, blank=True)
    key = models.CharField(max_length=250,unique=True, null=True, blank=True)
    email = models.EmailField(max_length=254)
    whatsapp = models.CharField(max_length=250)
    
    class Meta:
        db_table = 'clients'
