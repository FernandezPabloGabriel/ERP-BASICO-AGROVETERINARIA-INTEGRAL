import type { Product } from '../types';

// --- Datos de Prueba (Seed Data) ---
export const INITIAL_PRODUCTS: Product[] = [
    { id: 1, name: 'Bolsa Maíz 20kg', category: 'Forrajeria', stock: 15, minStock: 5, price: 15000, unit: 'UN', isBulk: false },
    { id: 2, name: 'Maíz Suelto', category: 'Forrajeria', stock: 45.5, minStock: 10, price: 900, unit: 'KG', isBulk: true },
    { id: 3, name: 'Pipeta Anti-Pulgas', category: 'Farmacia', stock: 4, minStock: 10, price: 4500, unit: 'UN', isBulk: false },
    { id: 4, name: 'Correa Extensible', category: 'Accesorio', stock: 8, minStock: 2, price: 8200, unit: 'UN', isBulk: false },
    { id: 5, name: 'Alimento DogPro 15kg', category: 'Alimento', stock: 2, minStock: 3, price: 22000, unit: 'UN', isBulk: false },
];
