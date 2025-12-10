import { Navigate, useLocation } from "react-router";
import { useAuth } from "@/contexts/AuthContext";
import type { JSX } from "react";

export default function RequireAuth({ children }: { children: JSX.Element }) {
  const { auth } = useAuth();
  const location = useLocation();

  if (!auth.isAuthenticated) {
    // redirect to login, keep the original location in state
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
