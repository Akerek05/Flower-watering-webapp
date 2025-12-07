import { useState, ChangeEvent, FormEvent } from "react";
import { Box, Paper, Typography } from "@mui/material";
import "./PlantForm.css";
import PlantFormFields from "./PlantFormFields";
import type { Plant } from "../../../types/plant";

type PlantFormProps = {
  user: string;
  setPlants: React.Dispatch<React.SetStateAction<Plant[]>>;
  onBack: () => void;
};

// csak a formhoz kell: owner + nextWatering nélkül, image opcionális
export type FormPlant = {
  name: string;
  type: string;
  frequency: string;
  image?: string;
  note: string;
};

export default function PlantForm({ user, setPlants, onBack }: PlantFormProps) {
  const [plant, setPlant] = useState<FormPlant>({
    name: "",
    type: "",
    frequency: "",
    image: undefined,
    note: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPlant({ ...plant, [e.target.name]: e.target.value });
  };

  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) =>
      setPlant((p) => ({ ...p, image: ev.target?.result as string }));
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!plant.name || !plant.type || !plant.frequency) {
      alert("Kérlek, töltsd ki az összes mezőt!");
      return;
    }

    const now = new Date();
    const nextDate = new Date(now);
    const freq = parseInt(plant.frequency, 10);
    nextDate.setDate(now.getDate() + (isNaN(freq) ? 3 : freq));

    const newPlant: Plant = {
      ...plant,
      owner: user,
      nextWatering: nextDate.toISOString(),
      createdAt: new Date().toISOString(), 
      waterCount: 0,
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
