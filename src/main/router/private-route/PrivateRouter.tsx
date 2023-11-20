import { Navigate } from "react-router-dom";
import { makeCookieAuth } from "../../factories/make-cookie";

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const isAuthenticated = makeCookieAuth().get('access_token');
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
