import { Box, Typography, Card, List, ListItem, ListItemText } from "@mui/material";
import "./WateringCalendar.css";
import type { Plant } from "../../types/plant";

type WateringCalendarProps = {
  user: string;
  plants: Plant[];
};

type PlantsByDate = Record<string, Plant[]>;
/**
 * Locsolási naptár nézet.
 *
 * - A felhasználó növényeit a `nextWatering` dátum szerint csoportosítja.
 * - Minden naphoz kártyán jeleníti meg az adott napra ütemezett növényeket.
 */
export default function WateringCalendar({ user, plants }: WateringCalendarProps) {
  /** Csak az aktuális felhasználó növényei. */
  const userPlants = plants.filter((p) => p.owner === user);

  /** Dátum szerinti csoportosítás: { "2025.01.01.": [Plant, ...], ... } */
  const map: PlantsByDate = {};
  userPlants.forEach((p) => {
    const date = new Date(p.nextWatering).toLocaleDateString("hu-HU");
    if (!map[date]) map[date] = [];
    map[date].push(p);
  });

  /** A csoportosított adatok rendezett listája (dátum szerint). */
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
