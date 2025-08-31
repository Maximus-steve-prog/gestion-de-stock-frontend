import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';

const ArticleTable = ({ 
  articles, 
  globalFilter, 
  setGlobalFilter, 
  leftToolbarTemplate, 
  actionBodyTemplate 
}) => {
  return (
    <div className="card">
      <Toolbar className="mb-4" left={leftToolbarTemplate}></Toolbar>

      <DataTable 
        value={articles} 
        dataKey="id" 
        paginator 
        rows={10} 
        rowsPerPageOptions={[5, 10, 25]}
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        currentPageReportTemplate="Affichage de {first} à {last} sur {totalRecords} articles"
        globalFilter={globalFilter} 
        header={
          <div className="flex flex-wrap gap-2 items-center justify-between">
            <h4 className="m-0">Gestion des Articles</h4>
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
        <Column field="codeArticle" header="CodeArticle" sortable style={{ minWidth: '12rem' }}></Column>
        <Column field="designation" header="Designation" sortable style={{ minWidth: '12rem' }}></Column>
            <Column field="prixUnitaireHt" header="PrixUnitaireHt" sortable style={{ minWidth: '16rem' }}></Column>
            <Column field="prixUnitaireTtc" header="PrixUnitaireTtc" sortable style={{ minWidth: '14rem' }}></Column>
             <Column field="photo" header="Photo" sortable style={{ minWidth: '14rem' }}></Column>
        <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }}></Column>
      </DataTable>
    </div>
  );
};

export default ArticleTable;