from rest_framework import serializers
from .models import Producto

class ProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Producto
        fields = [
            "id",
            "nombre",
            "codigo_barra",
            "precio_costo",
            "precio_venta",
            "stock_actual",
            "stock_maximo",
            "stock_minimo",
            "unidad_medida",
            "es_granel",
            "tenant",
            "padre",
        ]