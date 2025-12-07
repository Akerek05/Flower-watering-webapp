import { Box, Typography, List, ListItem, ListItemText } from "@mui/material";
import type { Plant } from "../App";

type TodayPlantsProps = {
  user: string;
  plants: Plant[];
};

export default function TodayPlants({ user, plants }: TodayPlantsProps) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const duePlants = plants
    .filter((p) => p.owner === user)
    .filter((p) => {
      const d = new Date(p.nextWatering);
      d.setHours(0, 0, 0, 0);
      return d <= today; // ma vagy régebbi
    });

  if (duePlants.length === 0) {
    return (
      <Typography color="text.secondary" sx={{ mt: 1 }}>
        Ma nincs esedékes locsolás.
      </Typography>
    );
  }

  return (
    <Box sx={{ mt: 1 }}>
      <List dense>
        {duePlants.map((p, i) => (
          <ListItem key={i}>
            <ListItemText
              primary={p.name}
              secondary={`Típus: ${p.type} • Következő locsolás: ${new Date(
                p.nextWatering
              ).toLocaleDateString("hu-HU")}`}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
