# Generated by Django 3.1.2 on 2020-11-05 12:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('goals', '0005_auto_20201105_2124'),
    ]

    operations = [
        migrations.AddField(
            model_name='goal',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to='images'),
        ),
    ]
