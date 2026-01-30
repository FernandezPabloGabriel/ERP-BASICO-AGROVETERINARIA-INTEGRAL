# VeteChu App - Documentación del Proyecto

## 📋 Resumen

Aplicación de **Gestión de Stock** para una agroveterinaria, desarrollada con **Vite + React + TypeScript + Tailwind CSS**. El proyecto fue creado en 3 etapas con arquitectura modular, escalable y profesional.

---

## 🚀 Instalación y Ejecución

```bash
# Navegar al directorio del proyecto
cd vetechuapp

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Construir para producción
npm run build
```

---

## 📁 Estructura del Proyecto

```
vetechuapp/
├── public/                     # Archivos estáticos
├── src/
│   ├── components/             # Componentes React
│   │   ├── layout/             # Componentes de estructura
│   │   │   ├── Header.tsx      # Header con búsqueda y botón agregar
│   │   │   ├── Sidebar.tsx     # Menú lateral colapsable
│   │   │   └── index.ts        # Barrel export
│   │   ├── products/           # Componentes de productos
│   │   │   ├── ProductForm.tsx # Modal formulario CRUD
│   │   │   ├── ProductRow.tsx  # Fila de la tabla
│   │   │   ├── ProductTable.tsx# Tabla completa
│   │   │   └── index.ts        # Barrel export
│   │   └── ui/                 # Componentes UI reutilizables
│   │       ├── Button.tsx      # Botones genéricos
│   │       ├── Modal.tsx       # Modal genérico
│   │       ├── SearchInput.tsx # Input de búsqueda
│   │       ├── SidebarItem.tsx # Item del sidebar
│   │       └── index.ts        # Barrel export
│   ├── data/                   # Datos estáticos
│   │   └── initialProducts.ts  # Productos de prueba (seed data)
│   ├── hooks/                  # Custom hooks
│   │   ├── useProducts.ts      # Lógica CRUD de productos
│   │   ├── useSidebar.ts       # Estado del sidebar
│   │   └── index.ts            # Barrel export
│   ├── types/                  # Tipos TypeScript
│   │   └── index.ts            # Interfaces y tipos
│   ├── App.tsx                 # Componente principal
│   ├── App.css                 # Estilos de App
│   ├── index.css               # Tailwind CSS imports
│   └── main.tsx                # Entry point
├── index.html
├── package.json
├── vite.config.ts              # Configuración Vite + Tailwind
├── tsconfig.json               # Configuración TypeScript
└── README.md
```

---

## 🔧 Tecnologías Utilizadas

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **Vite** | 7.x | Build tool y dev server |
| **React** | 19.x | Librería UI |
| **TypeScript** | 5.x | Tipado estático |
| **Tailwind CSS** | 4.x | Framework CSS utility-first |
| **lucide-react** | latest | Iconos SVG |

---

## 📦 Dependencias Instaladas

```json
{
  "dependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "lucide-react": "^latest"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.x",
    "typescript": "~5.x",
    "tailwindcss": "^4.x",
    "@tailwindcss/vite": "^4.x",
    "vite": "^7.x"
  }
}
```

---

## 🏗️ Etapas del Desarrollo

### Etapa 1: Proyecto Base
1. Creación del proyecto con `npm create vite@latest vetechuapp -- --template react-ts`
2. Instalación de Tailwind CSS: `npm install -D tailwindcss @tailwindcss/vite`
3. Instalación de iconos: `npm install lucide-react`
4. Configuración de `vite.config.ts` con plugin de Tailwind
5. Configuración de `index.css` con `@import "tailwindcss"`

### Etapa 2: Integración del Código
1. Integración del código de `ejemplo.txt` en `App.tsx`
2. Implementación de la interfaz de gestión de stock
3. CRUD funcional de productos
4. Sidebar colapsable
5. Búsqueda en tiempo real
6. Modal para agregar/editar productos

### Etapa 3: Modularización
1. **Tipos** (`/types`): Interfaces `Product`, `ProductFormData`, tipos auxiliares
2. **Datos** (`/data`): Seed data separado en `initialProducts.ts`
3. **Hooks** (`/hooks`): Lógica de estado extraída a custom hooks
   - `useProducts`: CRUD, búsqueda, modal, formulario
   - `useSidebar`: Estado del sidebar
4. **Componentes UI** (`/components/ui`): Componentes atómicos reutilizables
5. **Componentes Layout** (`/components/layout`): Sidebar y Header
6. **Componentes Products** (`/components/products`): Tabla, filas, formulario

---

## 🎯 Funcionalidades

| Funcionalidad | Descripción |
|---------------|-------------|
| ✅ Ver productos | Tabla con todos los productos |
| ✅ Agregar producto | Modal con formulario completo |
| ✅ Editar producto | Edición inline desde la tabla |
| ✅ Eliminar producto | Con confirmación |
| ✅ Buscar productos | Por nombre o categoría |
| ✅ Alertas de stock bajo | Indicador visual cuando stock ≤ mínimo |
| ✅ Productos a granel | Etiqueta especial para venta por peso |
| ✅ Sidebar colapsable | Menú lateral responsive |

---

## 📝 Tipos TypeScript

```typescript
// types/index.ts
export type ProductCategory = 'Alimento' | 'Accesorio' | 'Farmacia' | 'Forrajeria';
export type ProductUnit = 'UN' | 'KG' | 'L';

export interface Product {
  id: number;
  name: string;
  category: ProductCategory;
  stock: number;
  minStock: number;
  price: number;
  unit: ProductUnit;
  isBulk: boolean;
}

export type ProductFormData = Partial<Product>;
```

---

## 🪝 Custom Hooks

### `useProducts()`
Maneja toda la lógica de productos:
- `products`: Lista de productos
- `filteredProducts`: Productos filtrados por búsqueda
- `searchTerm` / `setSearchTerm`: Término de búsqueda
- `isModalOpen` / `closeModal`: Estado del modal
- `editingProduct`: Producto en edición
- `formData` / `setFormData`: Datos del formulario
- `handleAddClick`: Abrir modal para nuevo producto
- `handleEditClick`: Abrir modal para editar
- `handleDeleteClick`: Eliminar con confirmación
- `handleSave`: Guardar producto (crear/editar)

### `useSidebar(initialState)`
Maneja el estado del sidebar:
- `isOpen`: Estado actual
- `toggle`: Alternar estado
- `open` / `close`: Abrir/cerrar

---

## 🎨 Componentes

### UI Components (Reutilizables)
- **`Button`**: Botón con variantes (primary, secondary, danger)
- **`AddButton`**: Botón específico para "Nuevo Producto"
- **`Modal`**: Modal genérico con header y contenido
- **`SearchInput`**: Input con icono de búsqueda
- **`SidebarItem`**: Item del menú lateral

### Layout Components
- **`Sidebar`**: Menú lateral con logo y navegación
- **`Header`**: Header con título, búsqueda y acción principal

### Product Components
- **`ProductTable`**: Tabla completa con productos
- **`ProductRow`**: Fila individual con acciones
- **`ProductForm`**: Formulario modal para CRUD

---

## 🔮 Próximas Mejoras Sugeridas

1. **Persistencia**: Conectar con backend (Django REST Framework)
2. **Routing**: Agregar React Router para navegación
3. **Estado Global**: Context API o Zustand para estado compartido
4. **Validación**: React Hook Form + Zod para formularios
5. **Testing**: Vitest + React Testing Library
6. **PWA**: Service Worker para uso offline
7. **Internacionalización**: i18n para múltiples idiomas

---

## 📄 Licencia

Este proyecto fue creado como demostración técnica para VeteChu Agroveterinaria.

---

*Documentación generada el 29 de Enero de 2026*
