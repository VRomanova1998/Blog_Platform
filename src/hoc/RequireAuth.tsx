import { Navigate, useLocation } from 'react-router-dom';
import { ReactElement } from 'react';

import { useAppSelector } from '../hooks';

interface ComponentProps {
  children?: ReactElement;
}

export const RequireAuth: React.FC<ComponentProps> = ({ children }) => {
  const location = useLocation();
  const isLogin = useAppSelector((state) => state.user.isLogin);
  if (!isLogin) {
    return <Navigate to="/sign-in" state={{ from: location }} />;
  }
  return children;
};
