from django.db import models

class Producto(models.Model):
    UNIDAD_CHOICES=[
        ('unidad', 'Unidad'),
        ('kg', 'Kilogramo'),
    ]

    nombre = models.CharField(max_length=150)
    codigo_barra = models.CharField(max_length=100) 
    precio_costo = models.FloatField()
    precio_venta = models.FloatField()
    stock_actual = models.FloatField()
    stock_maximo = models.FloatField()
    stock_minimo = models.FloatField()
    # Se define una tupla con 2 conjuntos de valores, el primero es el que se guarda en la base de datos, el segundo es el que se mostrará en formularios y en el admin
    unidad_medida = models.CharField(
        max_length=10,
        choices=UNIDAD_CHOICES,
        default='unidad'
    )
    es_granel = models.BooleanField()
    padre = models.ForeignKey(
        'self',
        on_delete=models.CASCADE,
        null=True,
        blank=True, # Es para formularios, permite que estén vacíos
        related_name='hijos'
    )
    

    def __str__(self):
        return  self.nombre
    
