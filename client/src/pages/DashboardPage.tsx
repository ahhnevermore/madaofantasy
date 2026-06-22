import { AppBar, Toolbar, Typography, Button, Container, Box, Alert } from "@mui/material";
import { useState } from "react";
import { ROUTES } from "../utils";
import SettingsIcon from "@mui/icons-material/Settings";
import DashboardCard from "../components/DashboardCard";
import { useNavigate } from "react-router-dom";
import { useAlert } from "../contexts/AlertContext";

export default function Dashboard() {
  const { showAlert } = useAlert();
  const navigate = useNavigate();
  return (
    <>
      <Container maxWidth="lg">
        <Box sx={{ py: 4, display: "flex", gap: 2, flexWrap: "wrap" }}>
          <DashboardCard
            title="Hay Day"
            description="Trade items in the marketplace"
            onClick={() => navigate("/hayday")}
          />
        </Box>
      </Container>
    </>
  );
}
