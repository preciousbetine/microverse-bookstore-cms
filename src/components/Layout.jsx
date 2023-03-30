import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '@/components/Header';

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
