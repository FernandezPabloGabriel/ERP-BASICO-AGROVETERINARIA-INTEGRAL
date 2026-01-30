import { SearchInput, AddButton } from '../ui';

interface HeaderProps {
    title: string;
    subtitle?: string;
    searchValue: string;
    onSearchChange: (value: string) => void;
    onAddClick: () => void;
}

export function Header({ title, subtitle, searchValue, onSearchChange, onAddClick }: HeaderProps) {
    return (
        <header className="bg-white shadow-sm p-4 sm:p-6 flex flex-col sm:flex-row justify-between items-center gap-4 z-10">
            <div>
                <h2 className="text-2xl font-bold text-slate-800">{title}</h2>
                {subtitle && <p className="text-slate-500 text-sm">{subtitle}</p>}
            </div>

            <div className="flex w-full sm:w-auto gap-3">
                <SearchInput
                    value={searchValue}
                    onChange={onSearchChange}
                    placeholder="Buscar artículo..."
                />
                <AddButton onClick={onAddClick} />
            </div>
        </header>
    );
}
