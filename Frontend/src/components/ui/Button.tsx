import React from 'react';
import { Plus } from 'lucide-react';

interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    type?: 'button' | 'submit';
    variant?: 'primary' | 'secondary' | 'danger';
    icon?: React.ReactNode;
    className?: string;
}

export function Button({
    children,
    onClick,
    type = 'button',
    variant = 'primary',
    icon,
    className = ''
}: ButtonProps) {
    const baseStyles = 'px-4 py-2 rounded-lg flex items-center gap-2 font-medium transition active:scale-95';

    const variantStyles = {
        primary: 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm',
        secondary: 'text-slate-600 hover:bg-slate-100',
        danger: 'text-red-600 hover:bg-red-50'
    };

    return (
        <button
            type={type}
            onClick={onClick}
            className={`${baseStyles} ${variantStyles[variant]} ${className}`}
        >
            {icon}
            {children}
        </button>
    );
}

// Botón específico para "Nuevo"
interface AddButtonProps {
    onClick: () => void;
    label?: string;
}

export function AddButton({ onClick, label = 'Nuevo Producto' }: AddButtonProps) {
    return (
        <Button onClick={onClick} icon={<Plus size={20} />}>
            <span className="hidden sm:inline">{label}</span>
        </Button>
    );
}
