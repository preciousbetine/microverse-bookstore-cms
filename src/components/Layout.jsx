import React from 'react';
import { Outlet } from 'react-router-dom';
import Modal from '@/components/Modal';
import Header from '@/components/Header';
import Loader from '@/components/Loader';

function Layout() {
  return (
    <>
      <Header />
      <Modal />
      <Loader />
      <div className="app-body">
        <Outlet />
      </div>
    </>
  );
}

export default Layout;
