import { useRef, useState, useCallback, useEffect } from 'react';
import type { ColumnConfig, ColumnId } from '../../types';
import { GripVertical } from 'lucide-react';

interface TableHeaderCellProps {
    column: ColumnConfig;
    isDragging: boolean;
    onDragStart: (columnId: ColumnId) => void;
    onDragEnd: () => void;
    onDragOver: (columnId: ColumnId) => void;
    onResize: (columnId: ColumnId, width: number) => void;
    onContextMenu: (e: React.MouseEvent) => void;
}

export function TableHeaderCell({
    column,
    isDragging,
    onDragStart,
    onDragEnd,
    onDragOver,
    onResize,
    onContextMenu,
}: TableHeaderCellProps) {
    const cellRef = useRef<HTMLTableCellElement>(null);
    const [isResizing, setIsResizing] = useState(false);
    const [startX, setStartX] = useState(0);
    const [startWidth, setStartWidth] = useState(0);

    // Manejar resize con mouse
    const handleResizeStart = useCallback((e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsResizing(true);
        setStartX(e.clientX);
        setStartWidth(column.width);
    }, [column.width]);

    useEffect(() => {
        if (!isResizing) return;

        const handleMouseMove = (e: MouseEvent) => {
            const diff = e.clientX - startX;
            const newWidth = Math.max(startWidth + diff, column.minWidth);
            onResize(column.id, newWidth);
        };

        const handleMouseUp = () => {
            setIsResizing(false);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isResizing, startX, startWidth, column.id, column.minWidth, onResize]);

    // Drag handlers
    const handleDragStart = (e: React.DragEvent) => {
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/plain', column.id);
        onDragStart(column.id);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        onDragOver(column.id);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
    };

    const alignClass = {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right',
    }[column.align];

    return (
        <th
            ref={cellRef}
            className={`p-4 border-b select-none relative group ${alignClass} ${isDragging ? 'opacity-50 bg-blue-50' : ''}`}
            style={{ width: column.width, minWidth: column.minWidth }}
            draggable
            onDragStart={handleDragStart}
            onDragEnd={onDragEnd}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onContextMenu={onContextMenu}
        >
            <div className="flex items-center gap-1 cursor-grab active:cursor-grabbing">
                <GripVertical
                    size={14}
                    className="text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
                />
                <span className="flex-1">{column.label}</span>
            </div>

            {/* Handle de resize */}
            <div
                className={`absolute right-0 top-0 h-full w-2 cursor-col-resize hover:bg-blue-400/50 transition-colors ${isResizing ? 'bg-blue-500' : ''}`}
                onMouseDown={handleResizeStart}
                onClick={(e) => e.stopPropagation()}
            />
        </th>
    );
}
