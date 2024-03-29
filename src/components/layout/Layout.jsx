import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { AppBar } from '../appBar/AppBar';

export const Layout = () => {
  return (
    <div>
      <AppBar />
      <Suspense fallback="">
        <Outlet />
      </Suspense>
    </div>
  );
};
