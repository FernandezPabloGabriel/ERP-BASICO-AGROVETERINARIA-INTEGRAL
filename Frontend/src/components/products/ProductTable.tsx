import { useState, useCallback } from 'react';
import { Package } from 'lucide-react';
import type { Product, ContextMenuPosition, ColumnId } from '../../types';
import { ProductRow } from './ProductRow';
import { TableHeaderCell } from './TableHeaderCell';
import { ColumnContextMenu } from '../ui';
import { useTableColumns } from '../../hooks';

interface ProductTableProps {
    products: Product[];
    onEdit: (product: Product) => void;
    onDelete: (id: number) => void;
}

export function ProductTable({ products, onEdit, onDelete }: ProductTableProps) {
    const {
        sortedColumns,
        visibleColumns,
        draggedColumn,
        toggleColumnVisibility,
        setColumnWidth,
        resetColumns,
        handleDragStart,
        handleDragEnd,
        handleDragOver,
    } = useTableColumns();

    const [contextMenu, setContextMenu] = useState<ContextMenuPosition | null>(null);

    const handleContextMenu = useCallback((e: React.MouseEvent) => {
        e.preventDefault();
        setContextMenu({ x: e.clientX, y: e.clientY });
    }, []);

    const closeContextMenu = useCallback(() => {
        setContextMenu(null);
    }, []);

    const handleToggleVisibility = useCallback((columnId: ColumnId) => {
        toggleColumnVisibility(columnId);
    }, [toggleColumnVisibility]);

    const handleReset = useCallback(() => {
        resetColumns();
        closeContextMenu();
    }, [resetColumns, closeContextMenu]);

    // Número de columnas visibles para el colspan
    const visibleColumnCount = visibleColumns.length;

    return (
        <>
            <div className="flex-1 overflow-auto p-4 sm:p-6">
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                    {/* Indicador de funcionalidad */}
                    <div className="bg-slate-50 px-4 py-2 border-b border-slate-200 text-xs text-slate-500 flex items-center gap-4">
                        <span>Arrastrá las columnas para reordenarlas</span>
                        <span>•</span>
                        <span>Ajustá el ancho desde el borde derecho</span>
                        <span>•</span>
                        <span>Click derecho para mostrar/ocultar columnas</span>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse table-fixed">
                            <thead className="bg-slate-50 text-slate-600 text-xs uppercase font-bold tracking-wider">
                                <tr>
                                    {visibleColumns.map(column => (
                                        <TableHeaderCell
                                            key={column.id}
                                            column={column}
                                            isDragging={draggedColumn === column.id}
                                            onDragStart={handleDragStart}
                                            onDragEnd={handleDragEnd}
                                            onDragOver={handleDragOver}
                                            onResize={setColumnWidth}
                                            onContextMenu={handleContextMenu}
                                        />
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {products.length > 0 ? (
                                    products.map(product => (
                                        <ProductRow
                                            key={product.id}
                                            product={product}
                                            visibleColumns={visibleColumns}
                                            onEdit={onEdit}
                                            onDelete={onDelete}
                                        />
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={visibleColumnCount} className="p-12 text-center text-slate-400">
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
            </div>

            {/* Menú contextual */}
            <ColumnContextMenu
                position={contextMenu}
                columns={sortedColumns}
                onToggleVisibility={handleToggleVisibility}
                onReset={handleReset}
                onClose={closeContextMenu}
            />
        </>
    );
}
