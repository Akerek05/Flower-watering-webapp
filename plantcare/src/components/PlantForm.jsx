import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  MenuItem,
  Paper,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SaveIcon from "@mui/icons-material/Save";

/**
 * Növény hozzáadása űrlap
 * - kép feltöltés
 * - név, típus, locsolási gyakoriság
 * - mentés LocalStorage-be
 */
export default function PlantForm({ onBack }) {
  const [plant, setPlant] = useState({
    name: "",
    type: "",
    frequency: "",
    image: "",
    nextWatering: "",
  });

  const handleChange = (e) => {
    setPlant({ ...plant, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => {
      setPlant((p) => ({ ...p, image: ev.target.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!plant.name || !plant.type || !plant.frequency) {
      alert("Kérlek, töltsd ki az összes mezőt!");
      return;
    }

    const now = new Date();
    const nextDate = new Date(now);
    const freq = parseInt(plant.frequency);

    // pl. ha 3 naponta -> most + 3 nap
    nextDate.setDate(now.getDate() + (isNaN(freq) ? 3 : freq));

    const newPlant = {
      ...plant,
      nextWatering: nextDate.toISOString(),
    };

    const saved = JSON.parse(localStorage.getItem("plants") || "[]");
    saved.push(newPlant);
    localStorage.setItem("plants", JSON.stringify(saved));

    alert("🌿 Növény sikeresen hozzáadva!");
    onBack(); // vissza a főképernyőre
  };

  return (
    <Box
      component={Paper}
      sx={{
        p: 4,
        borderRadius: "16px",
        maxWidth: 400,
        mx: "auto",
        mt: 4,
      }}
    >
      <Typography variant="h6" gutterBottom>
        🌼 Új növény hozzáadása
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <TextField
          label="Növény neve"
          name="name"
          value={plant.name}
          onChange={handleChange}
          fullWidth
        />

        <TextField
          label="Típus (pl. szobanövény, kültéri)"
          name="type"
          value={plant.type}
          onChange={handleChange}
          fullWidth
        />

        <TextField
          select
          label="Locsolási gyakoriság (naponta)"
          name="frequency"
          value={plant.frequency}
          onChange={handleChange}
          fullWidth
        >
          <MenuItem value="1">Naponta</MenuItem>
          <MenuItem value="3">3 naponta</MenuItem>
          <MenuItem value="7">Hetente</MenuItem>
          <MenuItem value="14">Kéthetente</MenuItem>
        </TextField>

        <Button variant="outlined" component="label">
          Kép feltöltése
          <input type="file" accept="image/*" hidden onChange={handleImage} />
        </Button>

        {plant.image && (
          <Box
            component="img"
            src={plant.image}
            alt="Előnézet"
            sx={{
              width: "100%",
              maxHeight: 200,
              objectFit: "cover",
              borderRadius: "8px",
            }}
          />
        )}

        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
          <Button
            variant="outlined"
            color="secondary"
            startIcon={<ArrowBackIcon />}
            onClick={onBack}
          >
            Vissza
          </Button>

          <Button
            type="submit"
            variant="contained"
            color="success"
            startIcon={<SaveIcon />}
          >
            Mentés
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
