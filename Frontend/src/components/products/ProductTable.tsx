import { Package } from 'lucide-react';
import type { Product } from '../../types';
import { ProductRow } from './ProductRow';

interface ProductTableProps {
    products: Product[];
    onEdit: (product: Product) => void;
    onDelete: (id: number) => void;
}

export function ProductTable({ products, onEdit, onDelete }: ProductTableProps) {
    return (
        <div className="flex-1 overflow-auto p-4 sm:p-6">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-50 text-slate-600 text-xs uppercase font-bold tracking-wider">
                        <tr>
                            <th className="p-4 border-b">Producto</th>
                            <th className="p-4 border-b">Categoría</th>
                            <th className="p-4 border-b text-right">Stock</th>
                            <th className="p-4 border-b text-right">Precio</th>
                            <th className="p-4 border-b text-center">Estado</th>
                            <th className="p-4 border-b text-right">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {products.length > 0 ? (
                            products.map(product => (
                                <ProductRow
                                    key={product.id}
                                    product={product}
                                    onEdit={onEdit}
                                    onDelete={onDelete}
                                />
                            ))
                        ) : (
                            <tr>
                                <td colSpan={6} className="p-12 text-center text-slate-400">
                                    <div className="flex flex-col items-center gap-3">
                                        <Package size={48} className="text-slate-200" />
                                        <p>No se encontraron productos.</p>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
