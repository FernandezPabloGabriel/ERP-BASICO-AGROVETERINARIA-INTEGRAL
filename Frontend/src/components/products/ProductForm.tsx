import { Save } from 'lucide-react';
import type { Product, ProductFormData } from '../../types';
import { Modal } from '../ui';

interface ProductFormProps {
    isOpen: boolean;
    onClose: () => void;
    editingProduct: Product | null;
    formData: ProductFormData;
    setFormData: (data: ProductFormData) => void;
    onSave: (e: React.FormEvent) => void;
}

export function ProductForm({
    isOpen,
    onClose,
    editingProduct,
    formData,
    setFormData,
    onSave
}: ProductFormProps) {
    const title = editingProduct ? 'Editar Producto' : 'Nuevo Producto';

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={title}>
            <form onSubmit={onSave} className="p-6 space-y-4">
                {/* Nombre */}
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                        Nombre del Producto
                    </label>
                    <input
                        autoFocus
                        required
                        type="text"
                        className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Ej: Bolsa Alimento Perro"
                    />
                </div>

                {/* Categoría y Unidad */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Categoría</label>
                        <select
                            className="w-full p-2 border border-slate-300 rounded-lg outline-none bg-white"
                            value={formData.category}
                            onChange={e => setFormData({ ...formData, category: e.target.value as Product['category'] })}
                        >
                            <option value="Alimento">Alimento</option>
                            <option value="Forrajeria">Forrajería</option>
                            <option value="Accesorio">Accesorio</option>
                            <option value="Farmacia">Farmacia</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Unidad de Medida</label>
                        <select
                            className="w-full p-2 border border-slate-300 rounded-lg outline-none bg-white"
                            value={formData.unit}
                            onChange={e => setFormData({ ...formData, unit: e.target.value as Product['unit'] })}
                        >
                            <option value="UN">Unidad (UN)</option>
                            <option value="KG">Kilos (KG)</option>
                            <option value="L">Litros (L)</option>
                        </select>
                    </div>
                </div>

                {/* Stock Actual y Mínimo */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Stock Actual</label>
                        <input
                            type="number"
                            step="0.01"
                            className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                            value={formData.stock}
                            onChange={e => setFormData({ ...formData, stock: Number(e.target.value) })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Stock Mínimo (Alerta)</label>
                        <input
                            type="number"
                            className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                            value={formData.minStock}
                            onChange={e => setFormData({ ...formData, minStock: Number(e.target.value) })}
                        />
                    </div>
                </div>

                {/* Precio */}
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Precio de Venta ($)</label>
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">$</span>
                        <input
                            required
                            type="number"
                            className="w-full pl-8 p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none font-bold text-slate-700"
                            value={formData.price}
                            onChange={e => setFormData({ ...formData, price: Number(e.target.value) })}
                        />
                    </div>
                </div>

                {/* Es a Granel */}
                <div className="pt-2">
                    <label className="flex items-center gap-2 cursor-pointer p-3 border border-slate-200 rounded-lg hover:bg-slate-50">
                        <input
                            type="checkbox"
                            checked={formData.isBulk}
                            onChange={e => setFormData({ ...formData, isBulk: e.target.checked })}
                            className="w-5 h-5 text-emerald-600 rounded focus:ring-emerald-500"
                        />
                        <div>
                            <span className="block text-sm font-medium text-slate-800">¿Es venta a granel (Suelto)?</span>
                            <span className="block text-xs text-slate-500">Marcar si este producto se pesa en el mostrador.</span>
                        </div>
                    </label>
                </div>

                {/* Botones */}
                <div className="flex gap-3 pt-4 border-t border-slate-100 mt-4">
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex-1 py-3 text-slate-600 hover:bg-slate-100 rounded-xl font-medium transition"
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold shadow-lg shadow-emerald-200 transition active:scale-95 flex items-center justify-center gap-2"
                    >
                        <Save size={20} />
                        Guardar
                    </button>
                </div>
            </form>
        </Modal>
    );
}
