# Generated by Django 3.2.6 on 2021-09-10 18:21

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0007_alter_user_picture_url'),
    ]

    operations = [
        migrations.RenameField(
            model_name='user',
            old_name='picture_url',
            new_name='profile_image',
        ),
    ]
