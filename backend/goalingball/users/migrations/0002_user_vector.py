# Generated by Django 3.1.2 on 2020-11-30 15:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='vector',
            field=models.BinaryField(blank=True, null=True),
        ),
    ]
