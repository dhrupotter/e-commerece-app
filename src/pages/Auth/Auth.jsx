import { useAuth } from "../../contexts/auth.context";
import { useNavigate } from "react-router-dom";
import { Navigate, useLocation } from "react-router-dom";

export const RequiresAuth = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();
  return user.token ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
};
