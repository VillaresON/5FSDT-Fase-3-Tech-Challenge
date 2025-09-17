import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function ProtectedRoute({ children, requireRole }) {
  const { token, user } = useContext(AuthContext);

  if (!token) return <Navigate to="/login" replace />;

  if (requireRole && user?.role !== requireRole && user?.role !== "admin") {
    return <div>Sem permissão</div>;
  }

  return children;
}
