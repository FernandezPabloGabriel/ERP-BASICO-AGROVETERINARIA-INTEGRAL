import './App.css';
import { useProducts, useSidebar } from './hooks';
import { Sidebar, Header } from './components/layout';
import { ProductTable, ProductForm } from './components/products';

export default function App() {
  // Hooks personalizados
  const sidebar = useSidebar(true);
  const {
    filteredProducts,
    searchTerm,
    setSearchTerm,
    isModalOpen,
    editingProduct,
    formData,
    setFormData,
    handleAddClick,
    handleEditClick,
    handleDeleteClick,
    handleSave,
    closeModal
  } = useProducts();

  return (
    <div className="flex h-screen bg-slate-100 font-sans text-slate-800 overflow-hidden">

      {/* Sidebar */}
      <Sidebar isOpen={sidebar.isOpen} onToggle={sidebar.toggle} />

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">

        {/* Header */}
        <Header
          title="Gestión de Stock"
          subtitle="Controlá tus productos, precios y reposiciones."
          searchValue={searchTerm}
          onSearchChange={setSearchTerm}
          onAddClick={handleAddClick}
        />

        {/* Tabla de Productos */}
        <ProductTable
          products={filteredProducts}
          onEdit={handleEditClick}
          onDelete={handleDeleteClick}
        />
      </main>

      {/* Modal Formulario */}
      <ProductForm
        isOpen={isModalOpen}
        onClose={closeModal}
        editingProduct={editingProduct}
        formData={formData}
        setFormData={setFormData}
        onSave={handleSave}
      />

    </div>
  );
}
