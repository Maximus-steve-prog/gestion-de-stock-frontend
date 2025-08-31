import React from 'react';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

const ClientForm = ({
  clientDialog,
  hideDialog,
  selectedClient,
  onInputChange,
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
      visible={clientDialog}
      style={{ width: '700px' }}
      header="Détails du client"
      modal
      className="p-fluid"
      footer={clientDialogFooter}
      onHide={hideDialog}
    >
      <div className="client-form mt-4 grid grid-cols-2 gap-4">
        <div className="field">
          <label htmlFor="nom" className="font-bold block mb-2">Nom</label>
          <InputText
            id="nom"
            value={selectedClient?.nom || ''}
            onChange={(e) => onInputChange(e, 'nom')}
            required
            autoFocus
            className="w-full"
          />
        </div>
        <div className="field">
          <label htmlFor="prenom" className="font-bold block mb-2">Prénom</label>
          <InputText
            id="prenom"
            value={selectedClient?.prenom || ''}
            onChange={(e) => onInputChange(e, 'prenom')}
            required
            className="w-full"
          />
        </div>
        <div className="field">
          <label htmlFor="photo" className="font-bold block mb-2">Photo (URL)</label>
          <InputText
            id="photo"
            value={selectedClient?.photo || ''}
            onChange={(e) => onInputChange(e, 'photo')}
            className="w-full"
          />
        </div>
        <div className="field">
          <label htmlFor="mail" className="font-bold block mb-2">Email</label>
          <InputText
            id="mail"
            value={selectedClient?.mail || ''}
            onChange={(e) => onInputChange(e, 'mail')}
            required
            className="w-full"
          />
        </div>
        <div className="field">
          <label htmlFor="numTel" className="font-bold block mb-2">Téléphone</label>
          <InputText
            id="numTel"
            value={selectedClient?.numTel || ''}
            onChange={(e) => onInputChange(e, 'numTel')}
            className="w-full"
          />
        </div>
      </div>
    </Dialog>
  );
};

export default ClientForm;