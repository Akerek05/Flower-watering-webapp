import { useState } from "react";
import { Box, TextField, Button, Paper, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import './PlantForm.css';

export default function PlantForm({ user, setPlants, onBack }) {
  const [plant, setPlant] = useState({
    name: "",
    type: "",
    frequency: "",
    image: "",
  });

  const handleChange = (e) => {
    setPlant({ ...plant, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setPlant((p) => ({ ...p, image: ev.target.result }));
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
    nextDate.setDate(now.getDate() + (isNaN(freq) ? 3 : freq));

    const newPlant = {
        ...plant,
        owner: user, // <-- hozzárendeljük a tulajdonost
        nextWatering: nextDate.toISOString(),
    };
    setPlants((prev) => [...prev, newPlant]); // <-- frissíti a listát App-ban
    onBack();
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
      <Paper sx={{ p: 4, width: "100%", maxWidth: 400 }}>
        <Typography variant="h6" gutterBottom>
          🌱 Új növény hozzáadása
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField name="name" label="Név" value={plant.name} onChange={handleChange} />
          <TextField name="type" label="Típus" value={plant.type} onChange={handleChange} />
          <TextField name="frequency" label="Locsolási gyakoriság (nap)" value={plant.frequency} onChange={handleChange} />
          <Button variant="outlined" component="label">
            Kép feltöltése
            <input type="file" hidden accept="image/*" onChange={handleImage} />
          </Button>

          {/* Előnézet: ugyanaz a fixált magasság és objekt-fit, mint a fő nézetben */}
          {plant.image && (
            <Box sx={{ mt: 1 }}>
              <Typography variant="subtitle2">Előnézet</Typography>
              <div className="preview-wrapper">
                <img src={plant.image} alt="preview" />
              </div>
            </Box>
          )}

          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
            <Button variant="outlined" startIcon={<ArrowBackIcon />} onClick={onBack}>
              Vissza
            </Button>
            <Button variant="contained" color="success" type="submit">
              Mentés
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
