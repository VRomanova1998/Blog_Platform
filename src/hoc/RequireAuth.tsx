import { Navigate, useLocation } from 'react-router-dom';

import { useAppSelector } from '../hooks';

export const RequireAuth = ({ children }) => {
  const location = useLocation();
  const isLogin = useAppSelector((state) => state.user.isLogin);
  if (!isLogin) {
    return <Navigate to="/sign-in" state={{ from: location }} />;
  }
  return children;
};
