import { useAppSelector } from './../hooks';
import { Navigate, Route, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  let location = useLocation();

  const { isLoggedIn, isLoading } = useAppSelector(state => state.authReducer);

  if (isLoading) {
    return <p>Checking authenticaton..</p>;
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
};

export default PrivateRoute;