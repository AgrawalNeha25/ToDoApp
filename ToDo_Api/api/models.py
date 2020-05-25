from django.db import models

class Task(models.Model):
    name = models.TextField(max_length=256, blank=False, unique=True)
    status = models.BooleanField(default=False)
    start_time = models.DateTimeField(blank=False, unique=True)
    end_time = models.DateTimeField(blank=False, unique=True)

    def __str__(self):
        return self.name