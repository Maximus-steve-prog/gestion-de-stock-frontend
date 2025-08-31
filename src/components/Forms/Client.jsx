import React, { useState, useEffect, useRef } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import Header from '../Layout/Header';
import Footer from '../Layout/Footer';
import ClientForm from '../ClientForm'; // Import corrigé
import ClientTable from '../ClientTable';
import { clientService } from '../../services/ClientApi';

const Client = () => {
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [clientDialog, setClientDialog] = useState(false);
  const [deleteClientDialog, setDeleteClientDialog] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const toast = useRef(null);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await clientService.getAll();
      console.log(response);
      setClients(response.data);
    } catch (error) {
      console.log('Error fetching clients:', error);
      toast.current.show({
        severity: 'error',
        summary: 'Erreur',
        detail: 'Impossible de charger les clients',
        life: 3000
      });
    }
  };

  const openNew = () => {
    setSelectedClient({
      nom: '',
      prenom: '',
      photo: '',
      mail: '',
      numTel: ''
    });
    setClientDialog(true);
  };

  const hideDialog = () => setClientDialog(false);
  const hideDeleteClientDialog = () => setDeleteClientDialog(false);

  const editClient = (client) => {
    setSelectedClient({ ...client });
    setClientDialog(true);
  };

  const confirmDeleteClient = (client) => {
    setSelectedClient(client);
    setDeleteClientDialog(true);
  };

  const saveClient = async () => {
    try {
      if (selectedClient.id) {
        await clientService.update(selectedClient.id, selectedClient);
        toast.current.show({
          severity: 'success',
          summary: 'Succès',
          detail: 'Client mis à jour',
          life: 3000
        });
      } else {
        await clientService.create(selectedClient);
        toast.current.show({
          severity: 'success',
          summary: 'Succès',
          detail: 'Client créé',
          life: 3000
        });
      }

      setClientDialog(false);
      setSelectedClient(null);
      fetchClients();
    } catch (error) {
      console.log('Error saving client:', error);
      toast.current.show({
        severity: 'error',
        summary: 'Erreur',
        detail: "Impossible de sauvegarder le client",
        life: 3000
      });
    }
  };

  const deleteClient = async () => {
    try {
      await clientService.delete(selectedClient.id);
      setDeleteClientDialog(false);
      setSelectedClient(null);
      toast.current.show({
        severity: 'success',
        summary: 'Succès',
        detail: 'Client supprimé',
        life: 3000
      });
      fetchClients();
    } catch (error) {
      console.log('Error deleting client:', error);
      toast.current.show({
        severity: 'error',
        summary: 'Erreur',
        detail: "Impossible de supprimer le client",
        life: 3000
      });
    }
  };

  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || '';
    let client = { ...selectedClient };
    client[name] = val;
    setSelectedClient(client);
  };

  const leftToolbarTemplate = () => (
    <div className="flex flex-wrap gap-2">
      <Button label="Nouveau" icon="pi pi-plus" severity="success" onClick={openNew} />
    </div>
  );

  const actionBodyTemplate = (rowData) => (
    <div className="flex gap-2">
      <Button icon="pi pi-pencil" rounded severity="warning" onClick={() => editClient(rowData)} />
      <Button icon="pi pi-trash" rounded severity="danger" onClick={() => confirmDeleteClient(rowData)} />
    </div>
  );

  const deleteClientDialogFooter = (
    <>
      <Button label="Non" icon="pi pi-times" outlined onClick={hideDeleteClientDialog} />
      <Button label="Oui" icon="pi pi-check" severity="danger" onClick={deleteClient} />
    </>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Toast ref={toast} />
      <Header />

      <main className="container mx-auto px-4 py-8">
        <ClientTable
          clients={clients}
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
          leftToolbarTemplate={leftToolbarTemplate}
          actionBodyTemplate={actionBodyTemplate}
        />
      </main>

      <ClientForm
        clientDialog={clientDialog}
        hideDialog={hideDialog}
        selectedClient={selectedClient}
        onInputChange={onInputChange}
        saveClient={saveClient}
      />

      <Dialog
        visible={deleteClientDialog}
        style={{ width: '500px' }}
        header="Confirmer"
        modal
        footer={deleteClientDialogFooter}
        onHide={hideDeleteClientDialog}
      >
        <div className="confirmation-content flex align-items-center">
          <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
          {selectedClient && (
            <span>
              Êtes-vous sûr de vouloir supprimer <b>{selectedClient.nom} {selectedClient.prenom}</b> ?
            </span>
          )}
        </div>
      </Dialog>

      <Footer />
    </div>
  );
};

export default Client;