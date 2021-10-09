import React from 'react';
// Componentes generales
import Footer from '../components/footer';
import Header from '../components/header';
import ConfirmModal from '../components/confirmModal';
import SpinnerApp from '../components/spinnerApp';

const Layout = ({ children }) => {
  return (
    <>
      <SpinnerApp />
      <ConfirmModal />
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
