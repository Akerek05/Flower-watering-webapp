import { useState, useEffect } from "react";
import { Container, Typography, Button } from "@mui/material";
import Login from "./components/Login";
import MainScreen from "./components/MainScreen";
import PlantForm from "./components/PlantForm";
import StatsScreen from "./components/StatsScreen"; // 👈 új képernyő import

export default function App() {
  const [user, setUser] = useState(null);
  const [view, setView] = useState("main"); // "main" | "form" | "stats"
  const [plants, setPlants] = useState([]);

  // 🌿 Bejelentkezett user betöltése + növényei
  useEffect(() => {
    const savedUser = localStorage.getItem("currentUser");
    if (savedUser) {
      setUser(savedUser);
      const users = JSON.parse(localStorage.getItem("users") || "{}");
      setPlants(users[savedUser]?.plants || []);
    }
  }, []);

  // 💾 Növénylista mentése, ha változik
  useEffect(() => {
    if (!user) return;
    const users = JSON.parse(localStorage.getItem("users") || "{}");
    if (users[user]) {
      users[user].plants = plants;
      localStorage.setItem("users", JSON.stringify(users));
    }
  }, [plants, user]);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setUser(null);
  };

  if (!user) return <Login onLogin={(u) => setUser(u)} />;

  return (
    <Container sx={{ mt: 4, pb: 6 }}>
      <Typography variant="h5" gutterBottom>
        Üdvözöllek, {user}! 🌿
      </Typography>

      <Button
        variant="outlined"
        color="error"
        onClick={handleLogout}
        sx={{ mb: 3, mr: 2 }}
      >
        Kijelentkezés
      </Button>

      {view !== "login" && (
        <Button
          variant="outlined"
          color="primary"
          onClick={() => setView("stats")}
          sx={{ mb: 3 }}
        >
          📊 Statisztikák
        </Button>
      )}

      {view === "main" && (
        <MainScreen
          user={user}
          plants={plants}
          setPlants={setPlants}
          onAddPlant={() => setView("form")}
          onShowStats={() => setView("stats")}
        />
      )}

      {view === "form" && (
        <PlantForm
          user={user}
          setPlants={setPlants}
          onBack={() => setView("main")}
        />
      )}

      {view === "stats" && (
        <StatsScreen
          user={user}
          plants={plants}
          onBack={() => setView("main")}
        />
      )}
    </Container>
  );
}
