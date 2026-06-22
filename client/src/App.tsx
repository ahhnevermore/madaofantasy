import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import HayDayPage from "./pages/HayDayPage";
import SettingsPage from "./pages/SettingsPage";

import ProtectedRoute from "./components/ProtectedRoute";

import { ROUTES, User } from "./utils";
import MainLayout from "./layouts/MainLayout";

const theme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch(ROUTES.me, {
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Routes>
        <Route
          path="/login"
          element={user ? <Navigate to="/" replace /> : <LoginPage onLoginSuccess={setUser} />}
        />

        <Route
          element={
            <ProtectedRoute user={user}>
              <MainLayout user={user!} onLogout={() => setUser(null)} />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<DashboardPage />} />
          <Route path="/hayday" element={<HayDayPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}
