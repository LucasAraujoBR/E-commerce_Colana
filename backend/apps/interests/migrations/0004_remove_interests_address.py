# Generated by Django 4.1.3 on 2023-04-18 00:04

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('interests', '0003_interests_address_interests_latitude_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='interests',
            name='address',
        ),
    ]
