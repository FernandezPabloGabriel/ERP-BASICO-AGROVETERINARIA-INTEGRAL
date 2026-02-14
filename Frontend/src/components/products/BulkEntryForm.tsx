import { useRef, useEffect } from 'react';
import { Search, Trash2, Package, Check, X } from 'lucide-react';
import type { Product, BulkEntryItem } from '../../types';
import { Modal } from '../ui';

interface BulkEntryFormProps {
    isOpen: boolean;
    onClose: () => void;
    items: BulkEntryItem[];
    searchTerm: string;
    filteredProducts: Product[];
    total: number;
    totalItems: number;
    onSearchChange: (value: string) => void;
    onAddProduct: (product: Product) => void;
    onRemoveProduct: (productId: number) => void;
    onUpdateQuantity: (productId: number, quantity: number) => void;
    onUpdatePrice: (productId: number, price: number) => void;
    onConfirm: () => void;
}

export function BulkEntryForm({
    isOpen,
    onClose,
    items,
    searchTerm,
    filteredProducts,
    total,
    totalItems,
    onSearchChange,
    onAddProduct,
    onRemoveProduct,
    onUpdateQuantity,
    onUpdatePrice,
    onConfirm
}: BulkEntryFormProps) {
    const searchInputRef = useRef<HTMLInputElement>(null);

    // Focus en el input al abrir
    useEffect(() => {
        if (isOpen && searchInputRef.current) {
            setTimeout(() => searchInputRef.current?.focus(), 100);
        }
    }, [isOpen]);

    const handleProductSelect = (product: Product) => {
        onAddProduct(product);
        searchInputRef.current?.focus();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Carga Masiva de Stock">
            <div className="flex flex-col h-[70vh] max-h-[600px]">
                {/* Buscador con Autocompletado */}
                <div className="relative mb-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input
                            ref={searchInputRef}
                            type="text"
                            value={searchTerm}
                            onChange={(e) => onSearchChange(e.target.value)}
                            placeholder="Buscar producto por nombre o código de barras..."
                            className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        />
                    </div>

                    {/* Dropdown de resultados */}
                    {filteredProducts.length > 0 && (
                        <div className="absolute z-20 w-full mt-1 bg-white border border-slate-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                            {filteredProducts.map(product => (
                                <button
                                    key={product.id}
                                    onClick={() => handleProductSelect(product)}
                                    className="w-full px-4 py-3 flex items-center gap-3 hover:bg-slate-50 transition-colors text-left border-b border-slate-100 last:border-0"
                                >
                                    <Package size={18} className="text-slate-400 flex-shrink-0" />
                                    <div className="flex-1 min-w-0">
                                        <div className="font-medium text-slate-800 truncate">{product.name}</div>
                                        <div className="text-xs text-slate-500">
                                            <span className="font-mono">{product.barcode}</span> • Stock: {product.stock} {product.unit} • ${product.price.toLocaleString('es-AR')}
                                        </div>
                                    </div>
                                    <span className="text-emerald-600 text-sm font-medium">+ Agregar</span>
                                </button>
                            ))}
                        </div>
                    )}

                    {searchTerm && filteredProducts.length === 0 && (
                        <div className="absolute z-20 w-full mt-1 bg-white border border-slate-200 rounded-lg shadow-lg p-4 text-center text-slate-500">
                            No se encontraron productos
                        </div>
                    )}
                </div>

                {/* Grilla de Items */}
                <div className="flex-1 overflow-auto border border-slate-200 rounded-lg">
                    {items.length > 0 ? (
                        <table className="w-full text-left">
                            <thead className="bg-slate-50 sticky top-0">
                                <tr className="text-xs text-slate-600 uppercase font-bold">
                                    <th className="p-3 border-b">Producto</th>
                                    <th className="p-3 border-b text-center w-28">Cantidad</th>
                                    <th className="p-3 border-b text-right w-32">Precio Unit.</th>
                                    <th className="p-3 border-b text-right w-32">Subtotal</th>
                                    <th className="p-3 border-b text-center w-16">Acción</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {items.map(item => (
                                    <tr key={item.productId} className="hover:bg-slate-50 transition-colors">
                                        <td className="p-3">
                                            <div className="font-medium text-slate-800">{item.productName}</div>
                                            <div className="text-xs text-slate-500">ID: {item.productId}</div>
                                        </td>
                                        <td className="p-3">
                                            <div className="flex items-center justify-center gap-1">
                                                <button
                                                    onClick={() => onUpdateQuantity(item.productId, item.quantity - 1)}
                                                    className="w-8 h-8 rounded bg-slate-100 hover:bg-slate-200 transition flex items-center justify-center font-bold text-slate-600"
                                                    disabled={item.quantity <= 1}
                                                >
                                                    -
                                                </button>
                                                <input
                                                    type="number"
                                                    value={item.quantity}
                                                    onChange={(e) => onUpdateQuantity(item.productId, parseInt(e.target.value) || 1)}
                                                    className="w-16 text-center border border-slate-200 rounded py-1 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                                                    min="1"
                                                />
                                                <button
                                                    onClick={() => onUpdateQuantity(item.productId, item.quantity + 1)}
                                                    className="w-8 h-8 rounded bg-slate-100 hover:bg-slate-200 transition flex items-center justify-center font-bold text-slate-600"
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </td>
                                        <td className="p-3">
                                            <input
                                                type="number"
                                                value={item.unitPrice}
                                                onChange={(e) => onUpdatePrice(item.productId, parseFloat(e.target.value) || 0)}
                                                className="w-full text-right border border-slate-200 rounded py-1 px-2 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                                                min="0"
                                                step="0.01"
                                            />
                                        </td>
                                        <td className="p-3 text-right font-medium text-emerald-700">
                                            ${(item.quantity * item.unitPrice).toLocaleString('es-AR')}
                                        </td>
                                        <td className="p-3 text-center">
                                            <button
                                                onClick={() => onRemoveProduct(item.productId)}
                                                className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                                                title="Eliminar"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full py-12 text-slate-400">
                            <Package size={48} className="mb-3 opacity-50" />
                            <p className="text-sm">No hay productos agregados</p>
                            <p className="text-xs mt-1">Usá el buscador para agregar productos</p>
                        </div>
                    )}
                </div>

                {/* Footer con Totales */}
                <div className="mt-4 pt-4 border-t border-slate-200">
                    <div className="flex justify-between items-center mb-4">
                        <div className="text-slate-600">
                            <span className="font-medium">{items.length}</span> producto(s) •
                            <span className="font-medium ml-1">{totalItems}</span> unidades totales
                        </div>
                        <div className="text-right">
                            <div className="text-sm text-slate-500">Total General</div>
                            <div className="text-2xl font-bold text-emerald-700">
                                ${total.toLocaleString('es-AR')}
                            </div>
                        </div>
                    </div>

                    {/* Botones de Acción */}
                    <div className="flex gap-3">
                        <button
                            onClick={onClose}
                            className="flex-1 px-4 py-3 border border-slate-300 rounded-lg text-slate-600 hover:bg-slate-50 transition flex items-center justify-center gap-2 font-medium"
                        >
                            <X size={18} />
                            Cancelar
                        </button>
                        <button
                            onClick={onConfirm}
                            disabled={items.length === 0}
                            className="flex-1 px-4 py-3 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white rounded-lg transition flex items-center justify-center gap-2 font-medium"
                        >
                            <Check size={18} />
                            Confirmar Ingreso
                        </button>
                    </div>
                </div>
            </div>
        </Modal>
    );
}
