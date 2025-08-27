import React from 'react';

const Header = () => {
  return (
    <header className="bg-indigo-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-2">
        <h1 className="text-3xl font-bold">Gestion de Stock</h1>
        <p className="text-indigo-100">Système de gestion des utilisateurs</p>
      </div>
    </header>
  );
};

export default Header;