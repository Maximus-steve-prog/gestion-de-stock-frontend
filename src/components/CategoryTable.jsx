import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';

const CategoryTable = ({ 
  categories, 
  globalFilter, 
  setGlobalFilter, 
  leftToolbarTemplate, 
  actionBodyTemplate 
}) => {
  return (
    <div className="card">
      <Toolbar className="mb-4" left={leftToolbarTemplate}></Toolbar>

      <DataTable 
        value={categories} 
        dataKey="id" 
        paginator 
        rows={10} 
        rowsPerPageOptions={[5, 10, 25]}
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        currentPageReportTemplate="Affichage de {first} à {last} sur {totalRecords} categories"
        globalFilter={globalFilter} 
        header={
          <div className="flex flex-wrap gap-2 items-center justify-between">
            <h4 className="m-0">Gestion des Categories</h4>
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
        <Column field="code" header="code" sortable style={{ minWidth: '12rem' }}></Column>
        <Column field="designation" header="designation" sortable style={{ minWidth: '12rem' }}></Column>
        <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }}></Column>
      </DataTable>
    </div>
  );
};

export default CategoryTable;