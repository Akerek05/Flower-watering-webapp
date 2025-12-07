// src/components/AppToolbar.tsx
import { Box, Button, Typography } from "@mui/material";

type View = "main" | "form" | "stats" | "calendar";

type AppToolbarProps = {
  user: string;
  currentView: View;
  onLogout: () => void;
  onShowStats: () => void;
  onShowCalendar: () => void;
};
/**
 * Felső eszköztár az alkalmazásban.
 *
 * - Kijelentkezés gomb.
 * - Navigáció a statisztika és naptár nézetekre.
 * - A jelenlegi nézetnek megfelelően kiemeli az aktív gombot.
 */
export default function AppToolbar({
  user,
  currentView,
  onLogout,
  onShowStats,
  onShowCalendar,
}: AppToolbarProps) {
  return (
    <>
      <Typography variant="h5" gutterBottom>
        Üdvözöllek, {user}! 🌿
      </Typography>

      <Box sx={{ mb: 3, display: "flex", gap: 2 }}>
        <Button variant="outlined" color="error" onClick={onLogout}>
          Kijelentkezés
        </Button>

        <Button
          variant={currentView === "stats" ? "contained" : "outlined"}
          color="primary"
          onClick={onShowStats}
        >
          📊 Statisztikák
        </Button>

        <Button
          variant={currentView === "calendar" ? "contained" : "outlined"}
          color="primary"
          onClick={onShowCalendar}
        >
          📅 Locsolási naptár
        </Button>
      </Box>
    </>
  );
}
