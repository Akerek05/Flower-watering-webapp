import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";

/**
 * Főképernyő — a felhasználó növényeinek listáját mutatja.
 * Innen lehet új növényt hozzáadni.
 */
export default function MainScreen({ onAddPlant }) {
  const [plants, setPlants] = useState([]);

  // Betöltés LocalStorage-ből
  useEffect(() => {
    const saved = localStorage.getItem("plants");
    if (saved) {
      setPlants(JSON.parse(saved));
    }
  }, []);

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        🌿 Saját növényeid
      </Typography>

      {plants.length === 0 ? (
        <Typography color="text.secondary" sx={{ mt: 2 }}>
          Nincs még egyetlen növény sem. Adj hozzá egyet!
        </Typography>
      ) : (
        <Grid container spacing={2} sx={{ mt: 1 }}>
          {plants.map((plant, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card>
                {plant.image && (
                  <CardMedia
                    component="img"
                    height="160"
                    image={plant.image}
                    alt={plant.name}
                  />
                )}
                <CardContent>
                  <Typography variant="h6">{plant.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {plant.type} — Locsolás: {plant.frequency}
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    Következő locsolás:{" "}
                    {plant.nextWatering
                      ? new Date(plant.nextWatering).toLocaleDateString()
                      : "nincs megadva"}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <Button
        variant="contained"
        color="success"
        startIcon={<AddCircleIcon />}
        onClick={onAddPlant}
        sx={{ mt: 4 }}
      >
        Új növény hozzáadása
      </Button>
    </Box>
  );
}
