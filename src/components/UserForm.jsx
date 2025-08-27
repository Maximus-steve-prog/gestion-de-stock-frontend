import React from 'react';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';

const UserForm = ({
  userDialog,
  hideDialog,
  selectedUser,
  onInputChange,
  onDateChange,
  saveUser
}) => {
  const userDialogFooter = (
    <>
      <Button label="Annuler" icon="pi pi-times" outlined onClick={hideDialog} />
      <Button label="Sauvegarder" icon="pi pi-check" onClick={saveUser} />
    </>
  );

  return (
    <Dialog
      visible={userDialog}
      style={{ width: '700px' }}
      header="Détails de l'utilisateur"
      modal
      className="p-fluid"
      footer={userDialogFooter}
      onHide={hideDialog}
    >
      <div className="user-form mt-4 grid grid-cols-2 gap-4">
        <div className="field">
          <label htmlFor="nom" className="font-bold block mb-2">Nom</label>
          <InputText
            id="nom"
            value={selectedUser?.nom || ''}
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
            value={selectedUser?.prenom || ''}
            onChange={(e) => onInputChange(e, 'prenom')}
            required
            className="w-full"
          />
        </div>
        <div className="field col-span-2">
          <label htmlFor="email" className="font-bold block mb-2">Email</label>
          <InputText
            id="email"
            value={selectedUser?.email || ''}
            onChange={(e) => onInputChange(e, 'email')}
            required
            className="w-full"
          />
        </div>
        <div className="field">
          <label htmlFor="dateDeNaissance" className="font-bold block mb-2">Date de naissance</label>
          <Calendar
            id="dateDeNaissance"
            value={selectedUser?.dateDeNaissance ? new Date(selectedUser.dateDeNaissance) : null}
            onChange={(e) => onDateChange(e, 'dateDeNaissance')}
            dateFormat="dd/mm/yy"
            className="w-full"
            showIcon
          />
        </div>
        <div className="field">
          <label htmlFor="motDePasse" className="font-bold block mb-2">Mot de passe</label>
          <InputText
            id="motDePasse"
            type="password"
            value={selectedUser?.motDePasse || ''}
            onChange={(e) => onInputChange(e, 'motDePasse')}
            required
            className="w-full"
          />
        </div>
        <div className="field col-span-2">
          <label htmlFor="adresse1" className="font-bold block mb-2">Adresse</label>
          <InputText
            id="adresse1"
            value={selectedUser?.adresse?.adresse1 || ''}
            onChange={(e) => onInputChange(e, 'adresse.adresse1')}
            className="w-full"
          />
        </div>
        <div className="field">
          <label htmlFor="ville" className="font-bold block mb-2">Ville</label>
          <InputText
            id="ville"
            value={selectedUser?.adresse?.ville || ''}
            onChange={(e) => onInputChange(e, 'adresse.ville')}
            className="w-full"
          />
        </div>
        <div className="field">
          <label htmlFor="codePostal" className="font-bold block mb-2">Code postal</label>
          <InputText
            id="codePostal"
            value={selectedUser?.adresse?.codePostal || ''}
            onChange={(e) => onInputChange(e, 'adresse.codePostal')}
            className="w-full"
          />
        </div>
        <div className="field col-span-2">
          <label htmlFor="pays" className="font-bold block mb-2">Pays</label>
          <InputText
            id="pays"
            value={selectedUser?.adresse?.pays || ''}
            onChange={(e) => onInputChange(e, 'adresse.pays')}
            className="w-full"
          />
        </div>
      </div>
    </Dialog>
  );
};

export default UserForm;
