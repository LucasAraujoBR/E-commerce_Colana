from django.db import models

class Client(models.Model):
    
    CLIENT_TYPE = (
        ('inquilino','inquilino'),
        ('proprietário ','proprietário ')
    )
    
    name = models.CharField(max_length=250)
    type = models.CharField(max_length=250, choices=CLIENT_TYPE, default='inquilino')
    secret = models.CharField(max_length=250)
    key = models.CharField(max_length=250,unique=True)
    email = models.EmailField(max_length=254)
    whatsapp = models.CharField(max_length=250)
    
    class Meta:
        db_table = 'clients'
