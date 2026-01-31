import { useEffect, useRef } from 'react';
import type { ColumnConfig, ContextMenuPosition } from '../../types';
import { Eye, EyeOff, RotateCcw } from 'lucide-react';

interface ColumnContextMenuProps {
    position: ContextMenuPosition | null;
    columns: ColumnConfig[];
    onToggleVisibility: (columnId: ColumnConfig['id']) => void;
    onReset: () => void;
    onClose: () => void;
}

export function ColumnContextMenu({
    position,
    columns,
    onToggleVisibility,
    onReset,
    onClose
}: ColumnContextMenuProps) {
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                onClose();
            }
        }

        function handleEscape(event: KeyboardEvent) {
            if (event.key === 'Escape') {
                onClose();
            }
        }

        if (position) {
            document.addEventListener('mousedown', handleClickOutside);
            document.addEventListener('keydown', handleEscape);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEscape);
        };
    }, [position, onClose]);

    if (!position) return null;

    // Ajustar posición para que no se salga de la pantalla
    const adjustedX = Math.min(position.x, window.innerWidth - 220);
    const adjustedY = Math.min(position.y, window.innerHeight - 300);

    return (
        <div
            ref={menuRef}
            className="fixed z-50 bg-white rounded-lg shadow-xl border border-slate-200 py-2 min-w-[200px] animate-in fade-in zoom-in-95 duration-100"
            style={{ left: adjustedX, top: adjustedY }}
        >
            <div className="px-3 py-2 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-100">
                Mostrar/Ocultar Columnas
            </div>

            <div className="py-1 max-h-[300px] overflow-y-auto">
                {columns
                    .filter(col => col.id !== 'actions') // No permitir ocultar acciones
                    .sort((a, b) => a.order - b.order)
                    .map(column => (
                        <button
                            key={column.id}
                            onClick={() => onToggleVisibility(column.id)}
                            className="w-full px-3 py-2 flex items-center gap-3 hover:bg-slate-50 transition-colors text-left"
                        >
                            {column.visible ? (
                                <Eye size={16} className="text-emerald-600" />
                            ) : (
                                <EyeOff size={16} className="text-slate-400" />
                            )}
                            <span className={`text-sm ${column.visible ? 'text-slate-700' : 'text-slate-400'}`}>
                                {column.label}
                            </span>
                            {column.visible && (
                                <span className="ml-auto text-xs text-emerald-600 font-medium">✓</span>
                            )}
                        </button>
                    ))}
            </div>

            <div className="border-t border-slate-100 pt-1 mt-1">
                <button
                    onClick={onReset}
                    className="w-full px-3 py-2 flex items-center gap-3 hover:bg-slate-50 transition-colors text-left text-sm text-slate-600"
                >
                    <RotateCcw size={16} />
                    Restaurar valores predeterminados
                </button>
            </div>
        </div>
    );
}
