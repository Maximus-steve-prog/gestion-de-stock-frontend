import React, { useState, useEffect, useRef } from 'react';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import Header from '../Layout/Header';
import Footer from '../Layout/Footer';
import ArticleForm from '../ArticleForm';
import ArticleTable from '../ArticleTable';
import { articleService } from '../../services/ArticleApi';
import { categoryService } from '../../services/CategoryApi';

const Article = () => {
    const [articles, setArticles] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedArticle, setSelectedArticle] = useState(null);
    const [articleDialog, setArticleDialog] = useState(false);
    const [deleteArticleDialog, setDeleteArticleDialog] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);

    useEffect(() => {
        fetchArticles();
        fetchCategories();
    }, []);

    const fetchArticles = async () => {
        try {
            const response = await articleService.getAll();
            // Vérifiez la structure de la réponse de votre API
            console.log('Articles response:', response);
            
            // Selon votre API, cela pourrait être response, response.data, response.result, etc.
            // Ajustez en fonction de la structure réelle de votre réponse
            if (response.data) {
                setArticles(response.data);
            } else {
                setArticles(response);
            }
        } catch (error) {
            console.log('Error fetching articles:', error);
            toast.current.show({
                severity: 'error',
                summary: 'Erreur',
                detail: 'Impossible de charger les articles',
                life: 3000
            });
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await categoryService.getAll();
            // Vérifiez la structure de la réponse de votre API
            console.log('Categories response:', response);
            
            // Selon votre API, cela pourrait être response, response.data, response.result, etc.
            // Ajustez en fonction de la structure réelle de votre réponse
            if (response.data) {
                setCategories(response.data);
            } else {
                setCategories(response);
            }
        } catch (error) {
            console.log('Error fetching categories:', error);
            toast.current.show({
                severity: 'error',
                summary: 'Erreur',
                detail: 'Impossible de charger les catégories',
                life: 3000
            });
        }
    };

    const openNew = () => {
        setSelectedArticle({
            codeArticle: '',
            designation: '',
            prixUnitaireHt: null,
            tauxTva: null,
            prixUnitaireTtc: null,
            photo: '',
            category: null
        });
        setArticleDialog(true);
    };

    const hideDialog = () => setArticleDialog(false);
    const hideDeleteArticleDialog = () => setDeleteArticleDialog(false);

    const editArticle = (article) => {
        setSelectedArticle({ ...article });
        setArticleDialog(true);
    };

    const confirmDeleteArticle = (article) => {
        setSelectedArticle(article);
        setDeleteArticleDialog(true);
    };

    const saveArticle = async () => {
        try {
            // Calculer le prix TTC si nécessaire
            if (selectedArticle.prixUnitaireHt !== null && selectedArticle.tauxTva !== null) {
                const prixTtc = selectedArticle.prixUnitaireHt * (1 + selectedArticle.tauxTva / 100);
                selectedArticle.prixUnitaireTtc = parseFloat(prixTtc.toFixed(2));
            }

            if (selectedArticle.id) {
                await articleService.update(selectedArticle.id, selectedArticle);
                toast.current.show({
                    severity: 'success',
                    summary: 'Succès',
                    detail: 'Article mis à jour',
                    life: 3000
                });
            } else {
                await articleService.create(selectedArticle);
                toast.current.show({
                    severity: 'success',
                    summary: 'Succès',
                    detail: 'Article créé',
                    life: 3000
                });
            }

            setArticleDialog(false);
            setSelectedArticle(null);
            fetchArticles();
        } catch (error) {
            console.log('Error saving article:', error);
            toast.current.show({
                severity: 'error',
                summary: 'Erreur',
                detail: "Impossible de sauvegarder l'article",
                life: 3000
            });
        }
    };

    const deleteArticle = async () => {
        try {
            await articleService.delete(selectedArticle.id);
            setDeleteArticleDialog(false);
            setSelectedArticle(null);
            toast.current.show({
                severity: 'success',
                summary: 'Succès',
                detail: 'Article supprimé',
                life: 3000
            });
            fetchArticles();
        } catch (error) {
            console.log('Error deleting article:', error);
            toast.current.show({
                severity: 'error',
                summary: 'Erreur',
                detail: "Impossible de supprimer l'article",
                life: 3000
            });
        }
    };

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let article = { ...selectedArticle };
        
        article[name] = val;
        setSelectedArticle(article);
    };

    const onNumberChange = (e, name) => {
        const val = e.value;
        let article = { ...selectedArticle };
        
        article[name] = val;
        setSelectedArticle(article);
        
        // Si on change le prix HT ou le taux TVA, recalculer le TTC
        if ((name === 'prixUnitaireHt' || name === 'tauxTva') && 
            article.prixUnitaireHt !== null && article.tauxTva !== null) {
            const prixTtc = article.prixUnitaireHt * (1 + article.tauxTva / 100);
            article.prixUnitaireTtc = parseFloat(prixTtc.toFixed(2));
            setSelectedArticle({...article});
        }
    };

    const onDropdownChange = (e, name) => {
        const val = e.value;
        let article = { ...selectedArticle };
        
        article[name] = val;
        setSelectedArticle(article);
    };

    const leftToolbarTemplate = () => (
        <div className="flex flex-wrap gap-2">
            <Button label="Nouveau" icon="pi pi-plus" severity="success" onClick={openNew} />
        </div>
    );

    const actionBodyTemplate = (rowData) => (
        <div className="flex gap-2">
            <Button icon="pi pi-pencil" rounded severity="warning" onClick={() => editArticle(rowData)} />
            <Button icon="pi pi-trash" rounded severity="danger" onClick={() => confirmDeleteArticle(rowData)} />
        </div>
    );

    const deleteArticleDialogFooter = (
        <>
            <Button label="Non" icon="pi pi-times" outlined onClick={hideDeleteArticleDialog} />
            <Button label="Oui" icon="pi pi-check" severity="danger" onClick={deleteArticle} />
        </>
    );

    return (
        <div className="min-h-screen bg-gray-50">
            <Toast ref={toast} />
            <Header />

            <main className="container mx-auto px-4 py-8">
                <ArticleTable
                    articles={articles}
                    globalFilter={globalFilter}
                    setGlobalFilter={setGlobalFilter}
                    leftToolbarTemplate={leftToolbarTemplate}
                    actionBodyTemplate={actionBodyTemplate}
                />
            </main>

            <ArticleForm
                articleDialog={articleDialog}
                hideDialog={hideDialog}
                selectedArticle={selectedArticle}
                onInputChange={onInputChange}
                onNumberChange={onNumberChange}
                onDropdownChange={onDropdownChange}
                saveArticle={saveArticle}
                categories={categories}
            />

            <Dialog
                visible={deleteArticleDialog}
                style={{ width: '500px' }}
                header="Confirmer"
                modal
                footer={deleteArticleDialogFooter}
                onHide={hideDeleteArticleDialog}
            >
                <div className="confirmation-content flex align-items-center">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {selectedArticle && (
                        <span>
                            Êtes-vous sûr de vouloir supprimer <b>{selectedArticle.codeArticle} {selectedArticle.designation}</b> ?
                        </span>
                    )}
                </div>
            </Dialog>

            <Footer />
        </div>
    );
};

export default Article;