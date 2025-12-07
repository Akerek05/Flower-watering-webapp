import { Box, Typography, List, ListItem, ListItemText } from "@mui/material";
import type { Plant } from "../../../types/plant";


type TodayPlantsProps = {
  user: string;
  plants: Plant[];
};
/**
 * Az aktuális napon (vagy korábban) esedékes locsolású növények listája.
 *
 * - Ha nincs ilyen növény, egy rövid üzenetet jelenít meg.
 * - Egyébként listázza a nevüket, típusukat és a következő locsolás dátumát.
 */
export default function TodayPlants({ user, plants }: TodayPlantsProps) {
  /** A mai nap dátuma, idő nélkül, összehasonlításhoz normalizálva. */
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  /** Az aktuális userhez tartozó, ma vagy korábban esedékes növények. */
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
