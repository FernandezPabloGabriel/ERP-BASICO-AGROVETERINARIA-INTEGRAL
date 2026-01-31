import './App.css';
import { useProducts, useSidebar, useBulkEntry } from './hooks';
import { Sidebar, Header } from './components/layout';
import { ProductTable, ProductForm, BulkEntryForm } from './components/products';

export default function App() {
  // Hooks personalizados
  const sidebar = useSidebar(true);
  const {
    products,
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
    closeModal,
    handleBulkEntry
  } = useProducts();

  // Hook para carga masiva
  const bulkEntry = useBulkEntry(products, handleBulkEntry);

  return (
    <div className="flex h-screen bg-slate-100 font-sans text-slate-800 overflow-hidden">

      {/* Sidebar */}
      <Sidebar isOpen={sidebar.isOpen} onToggle={sidebar.toggle} />

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">

        {/* Header */}
        <Header
          title="Gestión de Stock"
          searchValue={searchTerm}
          onSearchChange={setSearchTerm}
          onAddClick={handleAddClick}
          onBulkEntryClick={bulkEntry.openBulkEntry}
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

      {/* Modal Carga Masiva */}
      <BulkEntryForm
        isOpen={bulkEntry.isOpen}
        onClose={bulkEntry.closeBulkEntry}
        items={bulkEntry.items}
        searchTerm={bulkEntry.searchTerm}
        filteredProducts={bulkEntry.filteredProducts}
        total={bulkEntry.total}
        totalItems={bulkEntry.totalItems}
        onSearchChange={bulkEntry.setSearchTerm}
        onAddProduct={bulkEntry.addProduct}
        onRemoveProduct={bulkEntry.removeProduct}
        onUpdateQuantity={bulkEntry.updateQuantity}
        onUpdatePrice={bulkEntry.updatePrice}
        onConfirm={bulkEntry.confirmEntry}
      />

    </div>
  );
}
