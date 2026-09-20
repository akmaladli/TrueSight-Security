import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

function RequireAuth({ children }) {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default RequireAuth;
