from django.contrib import admin
from .models import Producto
# En tu archivo admin.py

@admin.register(Producto)
class ProductAdmin(admin.ModelAdmin):
    # 1. Columnas que se ven en la lista (ajusta los nombres a tus campos reales)
    list_display = ('id', 'nombre', 'codigo_barra', 'precio_venta', 'stock_actual', 'unidad_medida')
    
    # 2. Habilita una barra de búsqueda (buscara por nombre)
    search_fields = ('nombre',)
    
    # 3. Filtros a la derecha de la pantalla (muy útil para demos)
    
    
    # 4. Ordenar por defecto
    ordering = ('nombre',)

# No te olvides de registrar el Negocio también para poder crearlo
# admin.site.register(Business)