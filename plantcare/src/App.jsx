import { useState, useEffect } from "react";
import { Container, Typography, Button } from "@mui/material";
import Login from "./components/Login";
import MainScreen from "./components/MainScreen";
import PlantForm from "./components/PlantForm";

export default function App() {
  const [user, setUser] = useState(null);
  const [view, setView] = useState("main");

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(savedUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  if (!user) {
    return <Login onLogin={setUser} />;
  }

  return (
    <Container sx={{ mt: 4, pb: 6 }}>
      <Typography variant="h5" gutterBottom>
        Üdvözöllek, {user}! 🌿
      </Typography>
      <Button variant="outlined" color="error" onClick={handleLogout} sx={{ mb: 3 }}>
        Kijelentkezés
      </Button>

      {view === "main" ? (
        <MainScreen onAddPlant={() => setView("form")} />
      ) : (
        <PlantForm onBack={() => setView("main")} />
      )}
    </Container>
  );
}
