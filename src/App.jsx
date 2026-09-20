import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider, useAuth } from "./components/AuthContext";
import RequireAuth from "./components/RequireAuth";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import "./App.css";

function AppRoutes() {
  const { isLoggedIn } = useAuth();

  return (
    <Routes>
      <Route
        path="/login"
        element={
          isLoggedIn ? <Navigate to="/dashboard" replace /> : <LoginPage />
        }
      />
      <Route
        path="/dashboard"
        element={
          <RequireAuth>
            <DashboardPage />
          </RequireAuth>
        }
      />
      <Route
        path="*"
        element={<Navigate to={isLoggedIn ? "/dashboard" : "/login"} replace />}
      />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
