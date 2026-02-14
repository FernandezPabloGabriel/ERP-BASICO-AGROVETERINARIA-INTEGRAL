ERP-BASICO-AGROVETERINARIA-INTEGRAL/
├── requirements.txt
│
├── [Backend/](#backend)
│   ├── db.sqlite3
│   ├── manage.py
│   ├── [core/](#core)
│   │   ├── settings.py
│   │   └── urls.py
│   ├── [inventory/](#inventory)
│   │   ├── admin.py
│   │   ├── apps.py
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── urls.py
│   │   ├── views.py
│   │   └── migrations/
│   └── [tenant/](#tenant)
│       ├── admin.py
│       ├── apps.py
│       ├── models.py
│       ├── views.py
│       └── migrations/
│
└── [Frontend/](#frontend)
    ├── eslint.config.js
    ├── index.html
    ├── package.json
    ├── README.md
    ├── tsconfig.app.json
    ├── tsconfig.json
    ├── tsconfig.node.json
    ├── vite.config.ts
    └── [src/](#src)
        ├── App.css
        ├── App.tsx
        ├── index.css
        ├── main.tsx
        ├── [components/](#components)
        │   ├── [layout/](#layout)
        │   │   ├── Header.tsx
        │   │   ├── index.ts
        │   │   └── Sidebar.tsx
        │   ├── [products/](#products)
        │   │   ├── BulkEntryForm.tsx
        │   │   ├── index.ts
        │   │   ├── ProductForm.tsx
        │   │   ├── ProductRow.tsx
        │   │   ├── ProductTable.tsx
        │   │   └── TableHeaderCell.tsx
        │   └── [ui/](#ui)
        │       ├── Button.tsx
        │       ├── ColumnContextMenu.tsx
        │       ├── index.ts
        │       ├── Modal.tsx
        │       ├── SearchInput.tsx
        │       └── SidebarItem.tsx
        ├── [data/](#data)
        │   └── initialProducts.ts
        ├── [hooks/](#hooks)
        │   ├── index.ts
        │   ├── useBulkEntry.ts
        │   ├── useProducts.ts
        │   ├── useSidebar.ts
        │   └── useTableColumns.ts
        └── [types/](#types)
            └── index.ts

# Backend
Contiene el backend del sistema, desarrollado en Django. Incluye la configuración principal, la base de datos y las aplicaciones internas.

## core
Configuración principal del proyecto Django: settings, urls, wsgi y asgi.

## inventory
App encargada de la gestión de inventario, productos y sus operaciones. Incluye modelos, vistas, serializers y migraciones.

## tenant
App para la gestión de multi-tenancy (multiempresa), permitiendo separar datos y configuraciones por cliente o empresa.

# Frontend
Contiene el frontend del sistema, desarrollado con React y TypeScript. Incluye la configuración de Vite y los módulos de la interfaz.

## src
Carpeta principal del código fuente del frontend.

### components
Componentes reutilizables de la interfaz. Se agrupan por funcionalidad: layout, products, ui.

#### layout
Componentes de estructura general de la interfaz, como el Header y Sidebar.

#### products
Componentes relacionados con la gestión y visualización de productos.

#### ui
Componentes de interfaz de usuario genéricos, como botones, modales y menús.

### data
Contiene datos de ejemplo o iniciales usados en la aplicación frontend.

### hooks
Custom hooks de React para lógica reutilizable en el frontend.

### types
Definiciones de tipos TypeScript usados en la aplicación frontend.

