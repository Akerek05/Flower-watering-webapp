import { useState, ChangeEvent } from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  TextField,
  MenuItem,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import "./MainScreen.css";
import PlantCard from "./PlantCard";
import PlantDetailsDialog from "./PlantDetailsDialog";
import TodayPlants from "./TodayPlants";
import type { Plant } from "../App";

type MainScreenProps = {
  user: string;
  plants: Plant[];
  setPlants: React.Dispatch<React.SetStateAction<Plant[]>>;
  onAddPlant: () => void;
  onShowStats: () => void;
  onShowCalendar: () => void;
};

export default function MainScreen({
  user,
  plants,
  setPlants,
  onAddPlant,
  onShowStats,
  onShowCalendar,
}: MainScreenProps) {
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [editPlant, setEditPlant] = useState<Plant | null>(null);

  const handleDelete = (index: number) => {
    if (!window.confirm("Biztosan törlöd ezt a növényt?")) return;
    const updated = plants.filter((_, i) => i !== index);
    setPlants(updated);
  };

  const handleWater = (index: number) => {
    setPlants((prev) => {
      const updated = [...prev];
      const plant = updated[index];
      const nextDate = new Date();
      nextDate.setDate(nextDate.getDate() + Number(plant.frequency));
      plant.nextWatering = nextDate.toISOString();

      const users = JSON.parse(localStorage.getItem("users") || "{}") as Record<
        string,
        { plants?: Plant[] }
      >;
      users[user].plants = updated;
      localStorage.setItem("users", JSON.stringify(users));
      return updated;
    });
  };

  const handleDetails = (index: number) => {
    setSelectedIndex(index);
    setEditPlant({ ...plants[index] });
  };

  const handleDetailsChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEditPlant((prev) => (prev ? { ...prev, [name]: value } : prev));
  };

  const handleDetailsSave = () => {
    if (selectedIndex == null || !editPlant) return;
    setPlants((prev) => {
      const updated = [...prev];
      updated[selectedIndex] = { ...editPlant };

      const users = JSON.parse(localStorage.getItem("users") || "{}") as Record<
        string,
        { plants?: Plant[] }
      >;
      users[user].plants = updated;
      localStorage.setItem("users", JSON.stringify(users));
      return updated;
    });
    setSelectedIndex(null);
    setEditPlant(null);
  };

  const handleDetailsClose = () => {
    setSelectedIndex(null);
    setEditPlant(null);
  };

  const filteredPlants = plants
    .filter((p) => p.owner === user)
    .filter(
      (p) =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.type.toLowerCase().includes(search.toLowerCase())
    )
    .filter((p) => (filterType ? p.type === filterType : true));

  const allTypes = [
    ...new Set(plants.filter((p) => p.owner === user).map((p) => p.type)),
  ];

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        🌿 {user} növényei
      </Typography>

      {/* kereső + szűrő */}
      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <TextField
          label="Keresés név vagy típus szerint"
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          fullWidth
        />
        <TextField
          select
          label="Szűrés kategória szerint"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          sx={{ minWidth: 200 }}
        >
          <MenuItem value="">Összes</MenuItem>
          {allTypes.map((t, i) => (
            <MenuItem key={i} value={t}>
              {t}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      {/* növénykártyák */}
      {filteredPlants.length === 0 ? (
        <Typography color="text.secondary" sx={{ mt: 2 }}>
          Nincs találat.
        </Typography>
      ) : (
        <Grid container spacing={2}>
          {filteredPlants.map((plant, index) => (
            <PlantCard
              key={index}
              plant={plant}
              index={index}
              onWater={handleWater}
              onDelete={handleDelete}
              onDetails={handleDetails}
            />
          ))}
        </Grid>
      )}

      {/* ma esedékes */}
      <Typography variant="h6" sx={{ mt: 4 }}>
        ✅ Ma esedékes locsolások
      </Typography>
      <TodayPlants user={user} plants={plants} />

      {/* gombok alul */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
        <Button
          variant="contained"
          color="success"
          startIcon={<AddCircleIcon />}
          onClick={onAddPlant}
        >
          Új növény
        </Button>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button variant="outlined" onClick={onShowStats}>
            📊 Statisztika
          </Button>
          <Button variant="outlined" onClick={onShowCalendar}>
            📅 Naptár
          </Button>
        </Box>
      </Box>

      {/* részletek + szerkesztés dialógus */}
      <PlantDetailsDialog
        open={Boolean(editPlant)}
        plant={editPlant}
        onClose={handleDetailsClose}
        onSave={handleDetailsSave}
        onChange={handleDetailsChange}
      />
    </Box>
  );
}
