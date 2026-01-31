import { useState, useCallback, useMemo } from 'react';
import type { ColumnConfig, ColumnId } from '../types';

const DEFAULT_COLUMNS: ColumnConfig[] = [
    { id: 'name', label: 'Producto', visible: true, width: 200, minWidth: 120, order: 0, align: 'left' },
    { id: 'category', label: 'Categoría', visible: true, width: 130, minWidth: 100, order: 1, align: 'left' },
    { id: 'stock', label: 'Stock', visible: true, width: 120, minWidth: 80, order: 2, align: 'left' },
    { id: 'price', label: 'Precio', visible: true, width: 100, minWidth: 80, order: 3, align: 'left' },
    { id: 'status', label: 'Estado', visible: true, width: 80, minWidth: 60, order: 4, align: 'left' },
    { id: 'actions', label: 'Acciones', visible: true, width: 100, minWidth: 80, order: 5, align: 'left' },
];

const STORAGE_KEY = 'product-table-columns';

function loadColumnsFromStorage(): ColumnConfig[] {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            return JSON.parse(saved);
        }
    } catch {
        // Si hay error, usar valores por defecto
    }
    return DEFAULT_COLUMNS;
}

function saveColumnsToStorage(columns: ColumnConfig[]) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(columns));
    } catch {
        // Ignorar errores de localStorage
    }
}

export function useTableColumns() {
    const [columns, setColumns] = useState<ColumnConfig[]>(loadColumnsFromStorage);
    const [draggedColumn, setDraggedColumn] = useState<ColumnId | null>(null);
    const [resizingColumn, setResizingColumn] = useState<ColumnId | null>(null);

    // Columnas ordenadas y visibles
    const sortedColumns = useMemo(() => {
        return [...columns].sort((a, b) => a.order - b.order);
    }, [columns]);

    const visibleColumns = useMemo(() => {
        return sortedColumns.filter(col => col.visible);
    }, [sortedColumns]);

    // Toggle visibilidad de columna
    const toggleColumnVisibility = useCallback((columnId: ColumnId) => {
        setColumns(prev => {
            const updated = prev.map(col =>
                col.id === columnId ? { ...col, visible: !col.visible } : col
            );
            saveColumnsToStorage(updated);
            return updated;
        });
    }, []);

    // Cambiar ancho de columna
    const setColumnWidth = useCallback((columnId: ColumnId, width: number) => {
        setColumns(prev => {
            const column = prev.find(col => col.id === columnId);
            if (!column) return prev;

            const newWidth = Math.max(width, column.minWidth);
            const updated = prev.map(col =>
                col.id === columnId ? { ...col, width: newWidth } : col
            );
            saveColumnsToStorage(updated);
            return updated;
        });
    }, []);

    // Mover columna (drag & drop)
    const moveColumn = useCallback((fromId: ColumnId, toId: ColumnId) => {
        if (fromId === toId) return;

        setColumns(prev => {
            const fromColumn = prev.find(col => col.id === fromId);
            const toColumn = prev.find(col => col.id === toId);
            if (!fromColumn || !toColumn) return prev;

            const fromOrder = fromColumn.order;
            const toOrder = toColumn.order;

            const updated = prev.map(col => {
                if (col.id === fromId) {
                    return { ...col, order: toOrder };
                }
                if (fromOrder < toOrder) {
                    // Moviendo hacia adelante
                    if (col.order > fromOrder && col.order <= toOrder) {
                        return { ...col, order: col.order - 1 };
                    }
                } else {
                    // Moviendo hacia atrás
                    if (col.order >= toOrder && col.order < fromOrder) {
                        return { ...col, order: col.order + 1 };
                    }
                }
                return col;
            });

            saveColumnsToStorage(updated);
            return updated;
        });
    }, []);

    // Resetear a valores por defecto
    const resetColumns = useCallback(() => {
        setColumns(DEFAULT_COLUMNS);
        saveColumnsToStorage(DEFAULT_COLUMNS);
    }, []);

    // Handlers de drag
    const handleDragStart = useCallback((columnId: ColumnId) => {
        setDraggedColumn(columnId);
    }, []);

    const handleDragEnd = useCallback(() => {
        setDraggedColumn(null);
    }, []);

    const handleDragOver = useCallback((columnId: ColumnId) => {
        if (draggedColumn && draggedColumn !== columnId) {
            moveColumn(draggedColumn, columnId);
        }
    }, [draggedColumn, moveColumn]);

    // Handlers de resize
    const startResize = useCallback((columnId: ColumnId) => {
        setResizingColumn(columnId);
    }, []);

    const endResize = useCallback(() => {
        setResizingColumn(null);
    }, []);

    return {
        columns,
        sortedColumns,
        visibleColumns,
        draggedColumn,
        resizingColumn,
        toggleColumnVisibility,
        setColumnWidth,
        moveColumn,
        resetColumns,
        handleDragStart,
        handleDragEnd,
        handleDragOver,
        startResize,
        endResize,
    };
}
