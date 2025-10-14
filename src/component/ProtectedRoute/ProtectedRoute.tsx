
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  if (localStorage.getItem("token")) {
    return children;
  } else {
    return <Navigate to={"/signUp"} />;
  }
}
