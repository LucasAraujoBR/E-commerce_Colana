# Generated by Django 4.1.3 on 2023-04-18 00:21

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('interests', '0004_remove_interests_address'),
    ]

    operations = [
        migrations.RenameField(
            model_name='interests',
            old_name='client_id',
            new_name='client',
        ),
    ]
