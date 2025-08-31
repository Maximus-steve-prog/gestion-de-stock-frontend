import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import Header from '../Layout/Header';
import Footer from '../Layout/Footer';
import CategoryForm from '../CategoryForm';
import CategoryTable from '../CategoryTable';
import { categoryService } from '../../services/CategoryApi';

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryDialog, setCategoryDialog] = useState(false);
  const [deleteCategoryDialog, setDeleteCategoryDialog] = useState(false);
  const [globalFilter, setGlobalFilter] = useState('');
  const [loading, setLoading] = useState(false);
  const toast = useRef(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    try {
      const response = await categoryService.getAll();
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
      toast.current.show({
        severity: 'error',
        summary: 'Erreur',
        detail: 'Impossible de charger les catégories',
        life: 3000
      });
    } finally {
      setLoading(false);
    }
  }, []);

  const openNew = () => {
    setSelectedCategory({ code: '', designation: '' });
    setCategoryDialog(true);
  };

  const hideDialog = () => {
    setCategoryDialog(false);
    setSelectedCategory(null);
  };

  const hideDeleteCategoryDialog = () => {
    setDeleteCategoryDialog(false);
    setSelectedCategory(null);
  };

  const editCategory = (category) => {
    setSelectedCategory({ ...category });
    setCategoryDialog(true);
  };

  const confirmDeleteCategory = (category) => {
    setSelectedCategory(category);
    setDeleteCategoryDialog(true);
  };

  const saveCategory = async () => {
    try {
      const categoryToSave = { ...selectedCategory };

      // Validation
      if (!categoryToSave.code || !categoryToSave.designation) {
        toast.current.show({
          severity: 'warn',
          summary: 'Attention',
          detail: 'Veuillez remplir tous les champs obligatoires',
          life: 3000
        });
        return;
      }

      if (categoryToSave.id) {
        await categoryService.update(categoryToSave.id, categoryToSave);
        toast.current.show({
          severity: 'success',
          summary: 'Succès',
          detail: 'Catégorie mise à jour',
          life: 3000
        });
      } else {
        await categoryService.create(categoryToSave);
        toast.current.show({
          severity: 'success',
          summary: 'Succès',
          detail: 'Catégorie créée',
          life: 3000
        });
      }

      setCategoryDialog(false);
      setSelectedCategory(null);
      fetchCategories();
    } catch (error) {
      console.error('Error saving category:', error);
      let errorDetail = "Impossible de sauvegarder la catégorie";

      if (error.response && error.response.data) {
        errorDetail = error.response.data.message || errorDetail;
      }

      toast.current.show({
        severity: 'error',
        summary: 'Erreur',
        detail: errorDetail,
        life: 3000
      });
    }
  };

  const deleteCategory = async () => {
    try {
      await categoryService.delete(selectedCategory.id);
      setDeleteCategoryDialog(false);
      setSelectedCategory(null);
      toast.current.show({
        severity: 'success',
        summary: 'Succès',
        detail: 'Catégorie supprimée',
        life: 3000
      });
      fetchCategories();
    } catch (error) {
      console.error('Error deleting category:', error);
      let errorDetail = "Impossible de supprimer la catégorie";

      if (error.response && error.response.data) {
        errorDetail = error.response.data.message || errorDetail;
      }

      toast.current.show({
        severity: 'error',
        summary: 'Erreur',
        detail: errorDetail,
        life: 3000
      });
    }
  };

  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || '';
    setSelectedCategory(prev => {
      let category = { ...prev };

      if (name.startsWith('code.')) {
        const field = name.split('.')[1];
        category.code = { ...category.code, [field]: val };
      } else {
        category[name] = val;
      }

      return category;
    });
  };

  const onDateChange = (e, field) => {
    setSelectedCategory(prev => ({
      ...prev,
      [field]: e.value || null
    }));
  };

  const leftToolbarTemplate = () => (
    <div className="flex flex-wrap gap-2">
      <Button
        label="Nouveau"
        icon="pi pi-plus"
        severity="success"
        onClick={openNew}
        loading={loading}
      />
    </div>
  );

  const actionBodyTemplate = (rowData) => (
    <div className="flex gap-2">
      <Button
        icon="pi pi-pencil"
        rounded
        severity="warning"
        onClick={() => editCategory(rowData)}
        disabled={loading}
      />
      <Button
        icon="pi pi-trash"
        rounded
        severity="danger"
        onClick={() => confirmDeleteCategory(rowData)}
        disabled={loading}
      />
    </div>
  );

  const deleteCategoryDialogFooter = (
    <>
      <Button
        label="Non"
        icon="pi pi-times"
        outlined
        onClick={hideDeleteCategoryDialog}
      />
      <Button
        label="Oui"
        icon="pi pi-check"
        severity="danger"
        onClick={deleteCategory}
      />
    </>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Toast ref={toast} />
      <Header />

      <main className="container mx-auto px-4 py-8 flex-grow">
        <CategoryTable
          categories={categories}
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
          leftToolbarTemplate={leftToolbarTemplate}
          actionBodyTemplate={actionBodyTemplate}
          loading={loading}
        />
      </main>

      {/* Category Create/Edit Dialog */}
      <Dialog
        visible={categoryDialog}
        style={{ width: '600px' }}
        header="Catégorie"
        modal
        onHide={hideDialog}
      >
        <CategoryForm
          selectedCategory={selectedCategory}
          onInputChange={onInputChange}
          onDateChange={onDateChange}
          saveCategory={saveCategory}
          hideDialog={hideDialog}
        />
      </Dialog>

      {/* Category Delete Confirmation */}
      <Dialog
        visible={deleteCategoryDialog}
        style={{ width: '500px' }}
        header="Confirmer"
        modal
        footer={deleteCategoryDialogFooter}
        onHide={hideDeleteCategoryDialog}
      >
        <div className="confirmation-content flex align-items-center">
          <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
          {selectedCategory && (
            <span>
              Êtes-vous sûr de vouloir supprimer <b>{selectedCategory.code} {selectedCategory.designation}</b> ?
            </span>
          )}
        </div>
      </Dialog>

      <Footer />
    </div>
  );
};

export default Category;