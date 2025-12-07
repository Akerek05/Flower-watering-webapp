import { useState, useEffect } from "react";
import { Container } from "@mui/material";
import Login from "./components/auth/Login";
import MainScreen from "./components/plants/MainScreen/MainScreen";
import PlantForm from "./components/plants/form/PlantForm";
import StatsScreen from "./components/plants/stats/StatsScreen";
import WateringCalendarScreen from "./components/calendar/WateringCalendarScreen";
import AppToolbar from "./components/layout/AppToolBar";
import type { Plant } from "./types/plant";
import type { View } from "./types/view";
import { requestNotificationPermission, sendNotification } from "./utils/notifications";

/**
 * Root application component.
 *
 * - Kezeli a bejelentkezett felhasználót.
 * - Betölti és menti a felhasználó növényeit localStorage-be.
 * - Nézetek között vált (fő lista, űrlap, statisztika, naptár).
 * - Értesítést kér és küld, ha van mára esedékes locsolás.
 */
export default function App() {
  /** Bejelentkezett felhasználó neve (null, ha nincs bejelentkezve). */
  const [user, setUser] = useState<string | null>(null);

  /** Jelenleg aktív nézet. */
  const [view, setView] = useState<View>("main");

  /** Aktuális felhasználóhoz tartozó növények listája. */
  const [plants, setPlants] = useState<Plant[]>([]);

  /**
   * Betölti a currentUser-t és a hozzá tartozó növényeket a localStorage-ből
   * az alkalmazás első betöltésekor.
   */
  useEffect(() => {
    const savedUser = localStorage.getItem("currentUser");
    if (savedUser) {
      setUser(savedUser);
      const users = JSON.parse(localStorage.getItem("users") || "{}") as Record<
        string,
        { plants?: Plant[] }
      >;
      setPlants(users[savedUser]?.plants || []);
    }
  }, []);

  /**
   * Ha a növénylista vagy a felhasználó változik,
   * frissíti a megfelelő user-hez tartozó növénylistát a localStorage-ben.
   */
  useEffect(() => {
    if (!user) return;
    const users = JSON.parse(localStorage.getItem("users") || "{}") as Record<
      string,
      { plants?: Plant[]; password?: string }
    >;
    if (users[user]) {
      users[user].plants = plants;
      localStorage.setItem("users", JSON.stringify(users));
    }
  }, [plants, user]);

  /**
   * Bejelentkezés után értesítési engedélyt kér a böngészőtől.
   */
  useEffect(() => {
    if (user) {
      requestNotificationPermission();
    }
  }, [user]);

  /**
   * Ha van mára esedékes locsolás, értesítést küld a felhasználónak.
   */
  useEffect(() => {
    if (!user) return;
    if (!("Notification" in window)) return;
    if (Notification.permission !== "granted") return;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const duePlants = plants
      .filter((p) => p.owner === user)
      .filter((p) => {
        const d = new Date(p.nextWatering);
        d.setHours(0, 0, 0, 0);
        return d <= today;
      });

    if (duePlants.length === 0) return;

    const names = duePlants.map((p) => p.name).join(", ");
    sendNotification(`Ma ezeket kell meglocsolni: ${names}`);
  }, [plants, user]);

  /** Kijelentkezteti a felhasználót és törli a currentUser-t a localStorage-ből. */
  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setUser(null);
  };

  // Ha nincs bejelentkezett user, a login képernyőt rendereljük.
  if (!user) return <Login onLogin={(u: string) => setUser(u)} />;

  return (
    <Container sx={{ mt: 4, pb: 6 }}>
      <AppToolbar
        user={user}
        currentView={view}
        onLogout={handleLogout}
        onShowStats={() => setView("stats")}
        onShowCalendar={() => setView("calendar")}
      />

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
