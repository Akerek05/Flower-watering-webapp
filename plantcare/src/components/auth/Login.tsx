import { useState, FormEvent } from "react";
import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
  Tabs,
  Tab,
} from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

type LoginProps = {
  onLogin: (username: string) => void;
};

type StoredUser = {
  password: string;
  plants: unknown[];
};

type UsersMap = Record<string, StoredUser>;

/**
 * Bejelentkezés / regisztrációs képernyő
 * Adatok LocalStorage-ben: users = { username: { password, plants: [] } }
 */
export default function Login({ onLogin }: LoginProps) {
  const [tab, setTab] = useState<"login" | "register">("login");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleChange = (_: React.SyntheticEvent, newValue: "login" | "register") =>
    setTab(newValue);

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users") || "{}") as UsersMap;
    const user = users[name];

    if (!user) {
      alert("Nincs ilyen felhasználó! Regisztrálj előbb.");
      return;
    }

    if (user.password !== password) {
      alert("Hibás jelszó!");
      return;
    }

    localStorage.setItem("currentUser", name);
    onLogin(name);
  };

  const handleRegister = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users") || "{}") as UsersMap;

    if (users[name]) {
      alert("Ez a felhasználónév már létezik!");
      return;
    }

    users[name] = { password, plants: [] };
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUser", name);

    alert("Sikeres regisztráció! 🌱");
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
          minWidth: "340px",
          textAlign: "center",
          borderRadius: "16px",
        }}
      >
        <Typography variant="h5" gutterBottom>
          🌿 PlantCare
        </Typography>

        <Tabs value={tab} onChange={handleChange} centered>
          <Tab label="Bejelentkezés" value="login" />
          <Tab label="Regisztráció" value="register" />
        </Tabs>

        <Box
          component="form"
          onSubmit={tab === "login" ? handleLogin : handleRegister}
          sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 3 }}
        >
          <TextField
            label="Felhasználónév"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
          />
          <TextField
            label="Jelszó"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
          />

          <Button
            type="submit"
            variant="contained"
            color={tab === "login" ? "primary" : "success"}
            startIcon={tab === "login" ? <LoginIcon /> : <PersonAddIcon />}
          >
            {tab === "login" ? "Bejelentkezés" : "Regisztráció"}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
