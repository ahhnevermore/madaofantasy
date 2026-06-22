import { AppBar, Toolbar, Typography, Button, Alert } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import { Outlet, useNavigate } from "react-router-dom";
import { ROUTES, User } from "../utils";
import { useState } from "react";
import AlertContext, { AlertSeverity } from "../contexts/AlertContext";
interface MainLayoutProps {
  user: User;
  onLogout: () => void;
}
export default function MainLayout({ user, onLogout }: MainLayoutProps) {
  const navigate = useNavigate();
  const [alert, setAlert] = useState<{
    severity: "error" | "warning" | "info" | "success";
    message: string;
  } | null>(null);
  const showAlert = (severity: AlertSeverity, message: string) => {
    setAlert({
      severity,
      message,
    });
  };
  const handleLogout = async () => {
    try {
      const response = await fetch(ROUTES.logout, {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) {
        showAlert("error", "Logout failed.");
        return;
      }

      onLogout();
    } catch (err) {
      console.error(err);

      showAlert("error", "Could not log out.");
    }
  };
  return (
    <AlertContext.Provider
      value={{
        showAlert,
      }}
    >
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            MadaoFantasy
          </Typography>
          <Typography variant="body2" sx={{ mr: 2 }}>
            {user.displayName}
          </Typography>
          <Button
            color="inherit"
            startIcon={<SettingsIcon />}
            onClick={() => navigate("/settings")}
          >
            Settings
          </Button>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      {alert && (
        <Alert severity={alert.severity} onClose={() => setAlert(null)}>
          {alert.message}
        </Alert>
      )}
      <Outlet />
    </AlertContext.Provider>
  );
}
