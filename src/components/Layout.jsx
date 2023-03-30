import React from 'react';
import Header from '@/components/Header';
import { Outlet } from 'react-router-dom';

function Layout() {
  return (
    <>
      <Header />
      <div className="app-body">
        <Outlet />
      </div>
    </>
  );
}

export default Layout;
