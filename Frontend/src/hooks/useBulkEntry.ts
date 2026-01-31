import { useState, useCallback, useMemo } from 'react';
import type { Product, BulkEntryItem } from '../types';

export function useBulkEntry(products: Product[], onConfirm: (items: BulkEntryItem[]) => void) {
    const [isOpen, setIsOpen] = useState(false);
    const [items, setItems] = useState<BulkEntryItem[]>([]);
    const [searchTerm, setSearchTerm] = useState('');

    // Productos filtrados para el autocompletado
    const filteredProducts = useMemo(() => {
        if (!searchTerm.trim()) return [];
        const term = searchTerm.toLowerCase();
        return products
            .filter(p =>
                p.name.toLowerCase().includes(term) ||
                p.id.toString().includes(term)
            )
            .slice(0, 8); // Limitar a 8 resultados
    }, [products, searchTerm]);

    // Total general
    const total = useMemo(() => {
        return items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
    }, [items]);

    // Total de items
    const totalItems = useMemo(() => {
        return items.reduce((sum, item) => sum + item.quantity, 0);
    }, [items]);

    // Abrir modal
    const openBulkEntry = useCallback(() => {
        setIsOpen(true);
        setItems([]);
        setSearchTerm('');
    }, []);

    // Cerrar modal
    const closeBulkEntry = useCallback(() => {
        setIsOpen(false);
        setItems([]);
        setSearchTerm('');
    }, []);

    // Agregar producto a la lista
    const addProduct = useCallback((product: Product) => {
        setItems(prev => {
            // Verificar si ya existe
            const existingIndex = prev.findIndex(item => item.productId === product.id);

            if (existingIndex >= 0) {
                // Si existe, incrementar cantidad
                const updated = [...prev];
                updated[existingIndex] = {
                    ...updated[existingIndex],
                    quantity: updated[existingIndex].quantity + 1
                };
                return updated;
            }

            // Si no existe, agregar nuevo
            return [...prev, {
                productId: product.id,
                productName: product.name,
                quantity: 1,
                unitPrice: product.price,
                unit: product.unit
            }];
        });
        setSearchTerm('');
    }, []);

    // Eliminar producto de la lista
    const removeProduct = useCallback((productId: number) => {
        setItems(prev => prev.filter(item => item.productId !== productId));
    }, []);

    // Actualizar cantidad
    const updateQuantity = useCallback((productId: number, quantity: number) => {
        if (quantity < 1) return;
        setItems(prev => prev.map(item =>
            item.productId === productId ? { ...item, quantity } : item
        ));
    }, []);

    // Actualizar precio
    const updatePrice = useCallback((productId: number, unitPrice: number) => {
        if (unitPrice < 0) return;
        setItems(prev => prev.map(item =>
            item.productId === productId ? { ...item, unitPrice } : item
        ));
    }, []);

    // Confirmar ingreso
    const confirmEntry = useCallback(() => {
        if (items.length === 0) return;
        onConfirm(items);
        closeBulkEntry();
    }, [items, onConfirm, closeBulkEntry]);

    return {
        isOpen,
        items,
        searchTerm,
        filteredProducts,
        total,
        totalItems,
        setSearchTerm,
        openBulkEntry,
        closeBulkEntry,
        addProduct,
        removeProduct,
        updateQuantity,
        updatePrice,
        confirmEntry
    };
}
