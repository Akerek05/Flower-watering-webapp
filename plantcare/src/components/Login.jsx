import { useState } from "react";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";

/**
 * Egyszerű bejelentkezési képernyő
 * Csak egy nevet kér, amit elment LocalStorage-be.
 */
export default function Login({ onLogin }) {
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      alert("Kérlek, add meg a neved!");
      return;
    }
    localStorage.setItem("user", name);
    onLogin(name);
  };

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #dcedc8, #c5e1a5)",
      }}
    >
      <Paper
        elevation={4}
        sx={{
          p: 4,
          minWidth: "320px",
          textAlign: "center",
          borderRadius: "16px",
        }}
      >
        <Typography variant="h5" gutterBottom>
          🌱 PlantCare bejelentkezés
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            mt: 2,
          }}
        >
          <TextField
            label="Felhasználónév"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            startIcon={<LoginIcon />}
          >
            Belépés
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
