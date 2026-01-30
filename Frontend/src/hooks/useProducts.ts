import { useState, useMemo } from 'react';
import type { Product, ProductFormData } from '../types';
import { INITIAL_PRODUCTS } from '../data/initialProducts';

const DEFAULT_FORM_DATA: ProductFormData = {
    name: '',
    category: 'Alimento',
    stock: 0,
    minStock: 5,
    price: 0,
    unit: 'UN',
    isBulk: false
};

export function useProducts() {
    const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [formData, setFormData] = useState<ProductFormData>(DEFAULT_FORM_DATA);

    // Filtro de búsqueda
    const filteredProducts = useMemo(() => {
        return products.filter(p =>
            p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.category.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [products, searchTerm]);

    const handleAddClick = () => {
        setEditingProduct(null);
        setFormData(DEFAULT_FORM_DATA);
        setIsModalOpen(true);
    };

    const handleEditClick = (product: Product) => {
        setEditingProduct(product);
        setFormData({ ...product });
        setIsModalOpen(true);
    };

    const handleDeleteClick = (id: number) => {
        if (confirm('¿Estás seguro de borrar este producto? Si tiene stock, se perderá.')) {
            setProducts(prev => prev.filter(p => p.id !== id));
        }
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.name || formData.price === undefined) return;

        if (editingProduct) {
            // Editar existente
            setProducts(prev => prev.map(p =>
                p.id === editingProduct.id ? { ...p, ...formData } as Product : p
            ));
        } else {
            // Crear nuevo
            const newProduct: Product = {
                ...formData as Product,
                id: Math.max(...products.map(p => p.id), 0) + 1
            };
            setProducts(prev => [...prev, newProduct]);
        }
        setIsModalOpen(false);
    };

    const closeModal = () => setIsModalOpen(false);

    return {
        products,
        filteredProducts,
        searchTerm,
        setSearchTerm,
        isModalOpen,
        editingProduct,
        formData,
        setFormData,
        handleAddClick,
        handleEditClick,
        handleDeleteClick,
        handleSave,
        closeModal
    };
}
