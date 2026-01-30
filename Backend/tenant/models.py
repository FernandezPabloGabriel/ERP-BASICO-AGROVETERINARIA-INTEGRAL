from django.db import models

class Tenant(models.Model):
    nombre = models.CharField(max_length=150)
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    mail = models.EmailField(unique=True)
    activo = models.BooleanField(default=True)

    def __str__(self):
        return self.nombre