import { useState } from "react";
import { Box, Paper, Typography } from "@mui/material";
import "./PlantForm.css";
import PlantFormFields from "./PlantFormFields";

export default function PlantForm({ user, setPlants, onBack }) {
  const [plant, setPlant] = useState({
    name: "",
    type: "",
    frequency: "",
    image: "",
    note: "",        // 👈 új mező
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
      owner: user,
      nextWatering: nextDate.toISOString(),
    };
    setPlants((prev) => [...prev, newPlant]);
    onBack();
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
      <Paper sx={{ p: 4, width: "100%", maxWidth: 400 }}>
        <Typography variant="h6" gutterBottom>
          🌱 Új növény hozzáadása
        </Typography>

        <PlantFormFields
          plant={plant}
          onChange={handleChange}
          onImageChange={handleImage}
          onBack={onBack}
          onSubmit={handleSubmit}
        />
      </Paper>
    </Box>
  );
}
