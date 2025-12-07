import { Box, Typography, Card, List, ListItem, ListItemText } from "@mui/material";
import "./WateringCalendar.css";
import type { Plant } from "../App";

type WateringCalendarProps = {
  user: string;
  plants: Plant[];
};

type PlantsByDate = Record<string, Plant[]>;

export default function WateringCalendar({ user, plants }: WateringCalendarProps) {
  const userPlants = plants.filter((p) => p.owner === user);

  const map: PlantsByDate = {};
  userPlants.forEach((p) => {
    const date = new Date(p.nextWatering).toLocaleDateString("hu-HU");
    if (!map[date]) map[date] = [];
    map[date].push(p);
  });

  const entries = Object.entries(map).sort(
    ([d1], [d2]) => new Date(d1).getTime() - new Date(d2).getTime()
  );

  if (entries.length === 0) {
    return (
      <Typography color="text.secondary" sx={{ mt: 2 }}>
        Nincs ütemezett locsolás.
      </Typography>
    );
  }

  return (
    <Box className="calendar-container">
      {entries.map(([date, plantsForDay]) => (
        <Card key={date} className="calendar-card">
          <Typography variant="subtitle1" className="calendar-date">
            {date}
          </Typography>
          <List dense>
            {plantsForDay.map((plant, i) => (
              <ListItem key={i} className="calendar-item">
                <ListItemText
                  primary={plant.name}
                  secondary={`Típus: ${plant.type} • ${plant.frequency} naponta`}
                />
              </ListItem>
            ))}
          </List>
        </Card>
      ))}
    </Box>
  );
}
