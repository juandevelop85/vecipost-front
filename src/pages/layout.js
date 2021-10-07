import React from 'react';
// Componentes generales
import Footer from '../components/footer';
import Header from '../components/header';
import ConfirmModal from '../components/confirmModal';

const Layout = ({ children }) => {
  return (
    <>
      <ConfirmModal />
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
