import React from 'react';

interface SidebarItemProps {
    icon: React.ReactNode;
    label: string;
    active?: boolean;
    isOpen: boolean;
    onClick?: () => void;
}

export function SidebarItem({ icon, label, active = false, isOpen, onClick }: SidebarItemProps) {
    return (
        <div
            onClick={onClick}
            className={`
        flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all
        ${active
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/20'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'}
      `}
        >
            <div className="min-w-[24px]">{icon}</div>
            {isOpen && <span className="font-medium whitespace-nowrap">{label}</span>}
        </div>
    );
}
