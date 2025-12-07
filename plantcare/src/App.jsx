import { useState, useEffect } from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import Login from "./components/Login";
import MainScreen from "./components/MainScreen";
import PlantForm from "./components/PlantForm";
import StatsScreen from "./components/StatsScreen";
import WateringCalendarScreen from "./components/WateringCalendarScreen";

export default function App() {
  const [user, setUser] = useState(null);
  const [view, setView] = useState("main"); // "main" | "form" | "stats" | "calendar"
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

      <Box sx={{ mb: 3, display: "flex", gap: 2 }}>
        <Button
          variant="outlined"
          color="error"
          onClick={handleLogout}
        >
          Kijelentkezés
        </Button>

        <Button
          variant="outlined"
          color="primary"
          onClick={() => setView("stats")}
        >
          📊 Statisztikák
        </Button>

        <Button
          variant="outlined"
          color="primary"
          onClick={() => setView("calendar")}
        >
          📅 Locsolási naptár
        </Button>
      </Box>

      {view === "main" && (
        <MainScreen
          user={user}
          plants={plants}
          setPlants={setPlants}
          onAddPlant={() => setView("form")}
          onShowStats={() => setView("stats")}
          onShowCalendar={() => setView("calendar")}
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

      {view === "calendar" && (
        <WateringCalendarScreen
          user={user}
          plants={plants}
          onBack={() => setView("main")}
        />
      )}
    </Container>
  );
}
