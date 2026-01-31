// --- Tipos de Datos del Sistema ---

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
    isBulk: boolean; // ¿Es suelto/a granel?
}

export type ProductFormData = Partial<Product>;

// --- Tipos para Configuración de Columnas de Tabla ---

export type ColumnId = 'name' | 'category' | 'stock' | 'price' | 'status' | 'actions';

export interface ColumnConfig {
    id: ColumnId;
    label: string;
    visible: boolean;
    width: number; // Ancho en píxeles
    minWidth: number;
    order: number;
    align: 'left' | 'center' | 'right';
}

export interface ContextMenuPosition {
    x: number;
    y: number;
}

// --- Tipos para Carga Masiva (Bulk Entry) ---

export interface BulkEntryItem {
    productId: number;
    productName: string;
    quantity: number;
    unitPrice: number;
    unit: ProductUnit;
}

export interface BulkEntryState {
    items: BulkEntryItem[];
    searchTerm: string;
    isOpen: boolean;
}
