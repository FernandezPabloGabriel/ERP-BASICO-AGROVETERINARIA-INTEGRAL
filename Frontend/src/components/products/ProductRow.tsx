import type { Product } from '../../types';
import { Edit2, Trash2, AlertTriangle } from 'lucide-react';

interface ProductRowProps {
    product: Product;
    onEdit: (product: Product) => void;
    onDelete: (id: number) => void;
}

export function ProductRow({ product, onEdit, onDelete }: ProductRowProps) {
    const isLowStock = product.stock <= product.minStock;
    const isOutOfStock = product.stock === 0;

    return (
        <tr className="hover:bg-slate-50 transition-colors group">
            {/* Nombre */}
            <td className="p-4">
                <div className="font-semibold text-slate-800">{product.name}</div>
                {product.isBulk && (
                    <span className="text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-bold">
                        A GRANEL
                    </span>
                )}
            </td>

            {/* Categoría */}
            <td className="p-4">
                <span className="inline-block px-2 py-1 rounded-md bg-slate-100 text-slate-600 text-xs font-medium border border-slate-200">
                    {product.category}
                </span>
            </td>

            {/* Stock */}
            <td className="p-4 text-right">
                <div className={`font-mono font-bold ${isLowStock ? 'text-red-600' : 'text-slate-700'}`}>
                    {product.stock} <span className="text-xs font-normal text-slate-400">{product.unit}</span>
                </div>
                {isLowStock && (
                    <div className="flex items-center justify-end gap-1 text-[10px] text-red-500 font-medium mt-1">
                        <AlertTriangle size={10} />
                        <span>Bajo Stock</span>
                    </div>
                )}
            </td>

            {/* Precio */}
            <td className="p-4 text-right font-medium text-emerald-700">
                ${product.price.toLocaleString('es-AR')}
            </td>

            {/* Estado */}
            <td className="p-4 text-center">
                <span className={`w-3 h-3 rounded-full inline-block ${isOutOfStock ? 'bg-red-500' : 'bg-emerald-500'}`}></span>
            </td>

            {/* Acciones */}
            <td className="p-4 text-right">
                <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                        onClick={() => onEdit(product)}
                        className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                        title="Editar"
                    >
                        <Edit2 size={18} />
                    </button>
                    <button
                        onClick={() => onDelete(product.id)}
                        className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                        title="Eliminar"
                    >
                        <Trash2 size={18} />
                    </button>
                </div>
            </td>
        </tr>
    );
}
