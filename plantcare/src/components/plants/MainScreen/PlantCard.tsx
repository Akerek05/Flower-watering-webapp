import { Card, Typography, Box, Button } from "@mui/material";
import "./MainScreen.css";
import type { Plant } from "../../../types/plant";


type PlantCardProps = {
  plant: Plant;
  index: number;
  onWater: (index: number) => void;
  onDelete: (index: number) => void;
  onDetails: (index: number) => void;
};

export default function PlantCard({
  plant,
  index,
  onWater,
  onDelete,
  onDetails,
}: PlantCardProps) {
  const nextWaterDate = new Date(plant.nextWatering);
  const today = new Date();
  nextWaterDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);
  const diffDays = Math.floor(
    (nextWaterDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );

  let bgColor = "#e8f5e9";
  if (diffDays < 0) bgColor = "#ffebee";
  else if (diffDays === 0) bgColor = "#fff8e1";

  return (
    <Box sx={{ width: { xs: "100%", md: "50%", lg: "33.33%" }, p: 1 }}>
      <Card sx={{ p: 2, backgroundColor: bgColor }}>
        <Typography variant="h6">{plant.name}</Typography>
        <Typography variant="body2">Típus: {plant.type}</Typography>
        <Typography variant="body2">
          Következő locsolás:{" "}
          {new Date(plant.nextWatering).toLocaleDateString("hu-HU")}
        </Typography>

        {plant.image && (
          <div className="plant-image-wrapper">
            <img src={plant.image} alt={plant.name} />
          </div>
        )}

        <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
          <Button
            variant="contained"
            color="success"
            onClick={() => onWater(index)}
          >
            💧 Meglocsolva
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={() => onDelete(index)}
          >
            Törlés
          </Button>
          <Button variant="outlined" onClick={() => onDetails(index)}>
            Részletek
          </Button>
        </Box>
      </Card>
    </Box>
  );
}
