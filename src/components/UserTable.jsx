import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';

const UserTable = ({ 
  users, 
  globalFilter, 
  setGlobalFilter, 
  leftToolbarTemplate, 
  actionBodyTemplate 
}) => {
  return (
    <div className="card">
      <Toolbar className="mb-4" left={leftToolbarTemplate}></Toolbar>

      <DataTable 
        value={users} 
        dataKey="id" 
        paginator 
        rows={10} 
        rowsPerPageOptions={[5, 10, 25]}
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        currentPageReportTemplate="Affichage de {first} à {last} sur {totalRecords} utilisateurs"
        globalFilter={globalFilter} 
        header={
          <div className="flex flex-wrap gap-2 items-center justify-between">
            <h4 className="m-0">Gestion des Utilisateurs</h4>
            <span className="p-input-icon-left">
              <i className="pi pi-search" />
              <InputText 
                type="search" 
                onInput={(e) => setGlobalFilter(e.target.value)} 
                placeholder="Rechercher..." 
              />
            </span>
          </div>
        } 
        responsiveLayout="scroll"
      >
        <Column field="nom" header="Nom" sortable style={{ minWidth: '12rem' }}></Column>
        <Column field="prenom" header="Prénom" sortable style={{ minWidth: '12rem' }}></Column>
        <Column field="email" header="Email" sortable style={{ minWidth: '16rem' }}></Column>
        <Column 
          field="dateDeNaissance" 
          header="Date de naissance" 
          sortable 
          style={{ minWidth: '14rem' }}
          body={(rowData) => new Date(rowData.dateDeNaissance).toLocaleDateString('fr-FR')}
        ></Column>
        <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }}></Column>
      </DataTable>
    </div>
  );
};

export default UserTable;