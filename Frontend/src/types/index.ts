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
