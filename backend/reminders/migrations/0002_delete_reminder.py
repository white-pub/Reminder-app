from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("reminders", "0001_initial"),
    ]

    operations = [
        migrations.DeleteModel(
            name="Reminder",
        ),
    ]