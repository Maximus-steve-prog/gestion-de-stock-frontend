import React from 'react';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

const ClientForm = ({
  ClientDialog,
  hideDialog,
  selectedClient,
  onInputChange,
  onDateChange,
  saveClient
}) => {
  const clientDialogFooter = (
    <>
      <Button label="Annuler" icon="pi pi-times" outlined onClick={hideDialog} />
      <Button label="Sauvegarder" icon="pi pi-check" onClick={saveClient} />
    </>
  );

  return (
    <Dialog
      visible={clientDialogFooter}
      style={{ width: '700px' }}
      header="Détails sur les clients"
      modal
      className="p-fluid"
      footer={clientDialogFooter}
      onHide={hideDialog}
    >
      <div className="client-form mt-4 grid grid-cols-2 gap-4">
        <div className="field">
          <label htmlFor="name" className="font-bold block mb-2">Name</label>
          <InputText
            id="name"
            value={selectedClient?.name || ''}
            onChange={(e) => onInputChange(e, 'name')}
            required
            autoFocus
            className="w-full"
          />
        </div>
        <div className="field">
          <label htmlFor="prenom" className="font-bold block mb-2">Prenom</label>
          <InputText
            id="prenom"
            value={selectedClient?.prenom || ''}
            onChange={(e) => onInputChange(e, 'prenom')}
            required
            className="w-full"
          />
        </div>
        <div className="field col-span-2">
          <label htmlFor="photo" className="font-bold block mb-2">Photo</label>
          <InputText
            id="photo"
            value={selectedClient?.photo || ''}
            onChange={(e) => onInputChange(e, 'photo')}
            required
            className="w-full"
          />
        </div>
        <div className="field">
          <label htmlFor="email" className="font-bold block mb-2">Email</label>
          <InputText
            id="email"
            value={selectedClient?.email || ''}
            onChange={(e) => onInputChange(e, 'email')}
            required
            className="w-full"
          />
        </div>
        <div className="field col-span-2">
          <label htmlFor="phoneNumberc" className="font-bold block mb-2">PhoneNumber</label>
          <InputText
            id="phoneNumberc"
            value={selectedClient?.phoneNumber || ''}
            onChange={(e) => onInputChange(e, 'phoneNumber')}
            className="w-full"
          />
        </div>
      </div>
    </Dialog>
  );
};

export default ClientForm;
