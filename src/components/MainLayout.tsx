import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

export const MainLayout = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [location]);

  return <Outlet />;
};
