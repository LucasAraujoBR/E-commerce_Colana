import { Navigate, Outlet } from "react-router-dom";

type PrivateRouteProps = {
  isLogged: boolean;
};

export const PrivateRoute = ({ isLogged }: PrivateRouteProps) => {
  return isLogged ? <Outlet /> : <Navigate to="/" />;
};
