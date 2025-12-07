import { Box, Typography, Button } from "@mui/material";
import WateringCalendar from "./WateringCalendar";

export default function WateringCalendarScreen({ user, plants, onBack }) {
  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        📅 Locsolási naptár
      </Typography>

      <WateringCalendar user={user} plants={plants} />

      <Box sx={{ mt: 3 }}>
        <Button variant="outlined" onClick={onBack}>
          ← Vissza
        </Button>
      </Box>
    </Box>
  );
}
