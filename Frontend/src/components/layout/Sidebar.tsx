import { Menu, X, Package, ShoppingCart, Archive, Settings } from 'lucide-react';
import { SidebarItem } from '../ui';

interface SidebarProps {
    isOpen: boolean;
    onToggle: () => void;
}

export function Sidebar({ isOpen, onToggle }: SidebarProps) {
    return (
        <aside className={`bg-slate-900 text-white transition-all duration-300 ${isOpen ? 'w-64' : 'w-20'} flex flex-col shadow-xl z-20`}>
            {/* Logo y Toggle */}
            <div className="p-4 flex items-center justify-between border-b border-slate-700">
                {isOpen && (
                    <h1 className="font-bold text-xl tracking-tight text-emerald-400">
                        Vete<span className="text-white">Chu</span>
                    </h1>
                )}
                <button onClick={onToggle} className="p-2 hover:bg-slate-800 rounded-lg">
                    {isOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
            </div>

            {/* Navegación */}
            <nav className="flex-1 p-4 space-y-2">
                <SidebarItem icon={<Package size={24} />} label="Inventario" active isOpen={isOpen} />
                <SidebarItem icon={<ShoppingCart size={24} />} label="Ventas (Próx)" isOpen={isOpen} />
                <SidebarItem icon={<Archive size={24} />} label="Proveedores" isOpen={isOpen} />
                <SidebarItem icon={<Settings size={24} />} label="Configuración" isOpen={isOpen} />
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-slate-700 text-slate-400 text-xs text-center">
                {isOpen && <p>v1.0.0 - Dev Mode</p>}
            </div>
        </aside>
    );
}
