import { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Box,
  Typography,
  Link as MuiLink,
  Alert,
} from "@mui/material";
import { ROUTES, User } from "../utils";

interface LoginProps {
  onLoginSuccess: (user: User) => void;
}

export default function Login({ onLoginSuccess }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (isRegistering && password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }
    try {
      const endpoint = isRegistering ? ROUTES.register : ROUTES.login;
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || `${isRegistering ? "Registration" : "Login"} failed`);
        return;
      }

      onLoginSuccess(data.user);
    } catch (err) {
      setError(`${isRegistering ? "Registration" : "Login"} failed. Please try again.`);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          minHeight: "100vh",
          py: 2,
        }}
      >
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography variant="h4" component="h1" sx={{ mb: 1 }}>
            {isRegistering ? "Create Account" : "Welcome"}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {isRegistering ? "Sign up to get started" : "Sign in to your account"}
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            variant="outlined"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
          />

          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={password.length > 0 && password.length < 8}
            helperText={password.length > 0 && password.length < 8 ? "Minimum 8 characters" : ""}
            slotProps={{
              htmlInput: {
                minLength: 8,
              },
            }}
            required
            disabled={loading}
          />
          {isRegistering && (
            <TextField
              fullWidth
              label="Confirm Password"
              type="password"
              variant="outlined"
              margin="normal"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              error={isRegistering && confirmPassword != "" && password !== confirmPassword}
              helperText={
                isRegistering && confirmPassword && password !== confirmPassword
                  ? "Passwords must match"
                  : ""
              }
              disabled={loading}
            />
          )}

          <Button
            fullWidth
            variant="contained"
            size="large"
            sx={{ mt: 3, mb: 2 }}
            type="submit"
            disabled={loading}
          >
            {loading ? "Loading..." : isRegistering ? "Create Account" : "Sign In"}
          </Button>
        </form>

        <Box sx={{ textAlign: "center", mt: 2 }}>
          <Typography variant="body2">
            {isRegistering ? "Already have an account? " : "Don't have an account? "}
            <MuiLink
              component="button"
              variant="body2"
              onClick={(e) => {
                e.preventDefault();
                setIsRegistering(!isRegistering);
                setConfirmPassword("");
                setError("");
              }}
              sx={{ cursor: "pointer" }}
            >
              {isRegistering ? "Sign in" : "Sign up"}
            </MuiLink>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}
