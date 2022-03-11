import { useAppSelector } from 'libs/hooks';
import { Navigate, Route, useLocation } from 'react-router-dom';
import AccessDenied from 'apps/home/src/app/content/pages/Status/AccessDenied';

const PrivateRoute = ({ children,  roles }: { children: JSX.Element , roles:Array<String>}) => {
  let location = useLocation();

  const { isLoggedIn,user, userRoles, isLoading } = useAppSelector(state => state.authReducer);

  const userHasRequiredRole = user && roles.some( role => userRoles.includes(role));

  if (isLoading) {
    return <p>Checking authenticaton..</p>;
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  if (isLoggedIn && !userHasRequiredRole) {
    return <AccessDenied />; // build your won access denied page (sth like 404)
  }

  return children;
};

export default PrivateRoute;