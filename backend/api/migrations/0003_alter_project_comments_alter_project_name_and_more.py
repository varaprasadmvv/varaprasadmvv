# Generated by Django 4.2.13 on 2024-06-07 11:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_rename_mymodel_project'),
    ]

    operations = [
        migrations.AlterField(
            model_name='project',
            name='comments',
            field=models.TextField(),
        ),
        migrations.AlterField(
            model_name='project',
            name='name',
            field=models.CharField(max_length=255),
        ),
        migrations.AlterField(
            model_name='project',
            name='status',
            field=models.CharField(max_length=50),
        ),
    ]
