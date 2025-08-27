import React, { useState, useEffect, useRef } from 'react';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { utilisateurService } from './services/api';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import UserForm from './components/UserForm';
import UserTable from './components/UserTable';

function App() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userDialog, setUserDialog] = useState(false);
  const [deleteUserDialog, setDeleteUserDialog] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const toast = useRef(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await utilisateurService.getAll();
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.current.show({
        severity: 'error',
        summary: 'Erreur',
        detail: 'Impossible de charger les utilisateurs',
        life: 3000
      });
    }
  };

  const openNew = () => {
    setSelectedUser({
      nom: '',
      prenom: '',
      email: '',
      dateDeNaissance: null,
      motDePasse: '',
      adresse: { adresse1: '', ville: '', codePostal: '', pays: '' },
      photo: ''
    });
    setUserDialog(true);
  };

  const hideDialog = () => setUserDialog(false);
  const hideDeleteUserDialog = () => setDeleteUserDialog(false);

  const editUser = (user) => {
    setSelectedUser({ ...user });
    setUserDialog(true);
  };

  const confirmDeleteUser = (user) => {
    setSelectedUser(user);
    setDeleteUserDialog(true);
  };

  const saveUser = async () => {
    try {
      let userToSave = { ...selectedUser };

      // ✅ conversion pour backend (LocalDate en yyyy-MM-dd)
      if (userToSave.dateDeNaissance instanceof Date) {
        userToSave.dateDeNaissance = userToSave.dateDeNaissance.toISOString().split('T')[0];
      }

      if (selectedUser.id) {
        await utilisateurService.update(selectedUser.id, userToSave);
        toast.current.show({
          severity: 'success',
          summary: 'Succès',
          detail: 'Utilisateur mis à jour',
          life: 3000
        });
      } else {
        await utilisateurService.create(userToSave);
        toast.current.show({
          severity: 'success',
          summary: 'Succès',
          detail: 'Utilisateur créé',
          life: 3000
        });
      }

      setUserDialog(false);
      setSelectedUser(null);
      fetchUsers();
    } catch (error) {
      console.error('Error saving user:', error);
      toast.current.show({
        severity: 'error',
        summary: 'Erreur',
        detail: "Impossible de sauvegarder l'utilisateur",
        life: 3000
      });
    }
  };

  const deleteUser = async () => {
    try {
      await utilisateurService.delete(selectedUser.id);
      setDeleteUserDialog(false);
      setSelectedUser(null);
      toast.current.show({
        severity: 'success',
        summary: 'Succès',
        detail: 'Utilisateur supprimé',
        life: 3000
      });
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.current.show({
        severity: 'error',
        summary: 'Erreur',
        detail: "Impossible de supprimer l'utilisateur",
        life: 3000
      });
    }
  };

  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || '';
    let user = { ...selectedUser };

    if (name.startsWith('adresse.')) {
      const field = name.split('.')[1];
      user.adresse = { ...user.adresse, [field]: val };
    } else {
      user[name] = val;
    }

    setSelectedUser(user);
  };

  const onDateChange = (e, name) => {
    let user = { ...selectedUser };
    user[name] = e.value || null;
    setSelectedUser(user);
  };

  const leftToolbarTemplate = () => (
    <div className="flex flex-wrap gap-2">
      <Button label="Nouveau" icon="pi pi-plus" severity="success" onClick={openNew} />
    </div>
  );

  const actionBodyTemplate = (rowData) => (
    <div className="flex gap-2">
      <Button icon="pi pi-pencil" rounded severity="warning" onClick={() => editUser(rowData)} />
      <Button icon="pi pi-trash" rounded severity="danger" onClick={() => confirmDeleteUser(rowData)} />
    </div>
  );

  const deleteUserDialogFooter = (
    <>
      <Button label="Non" icon="pi pi-times" outlined onClick={hideDeleteUserDialog} />
      <Button label="Oui" icon="pi pi-check" severity="danger" onClick={deleteUser} />
    </>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Toast ref={toast} />
      <Header />

      <main className="container mx-auto px-4 py-8">
        <UserTable
          users={users}
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
          leftToolbarTemplate={leftToolbarTemplate}
          actionBodyTemplate={actionBodyTemplate}
        />
      </main>

      <UserForm
        userDialog={userDialog}
        hideDialog={hideDialog}
        selectedUser={selectedUser}
        onInputChange={onInputChange}
        onDateChange={onDateChange}
        saveUser={saveUser}
      />

      <Dialog
        visible={deleteUserDialog}
        style={{ width: '500px' }}
        header="Confirmer"
        modal
        footer={deleteUserDialogFooter}
        onHide={hideDeleteUserDialog}
      >
        <div className="confirmation-content flex align-items-center">
          <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
          {selectedUser && (
            <span>
              Êtes-vous sûr de vouloir supprimer <b>{selectedUser.prenom} {selectedUser.nom}</b> ?
            </span>
          )}
        </div>
      </Dialog>

      <Footer />
    </div>
  );
}

export default App;
