# Generated by Django 4.2.7 on 2023-12-01 09:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('django_api', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='dash',
            name='end_year',
            field=models.TextField(null=True),
        ),
    ]
