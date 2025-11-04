import { useState } from "react";
import {
  Box, Typography, Button, Card, Grid, TextField, MenuItem
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";

export default function MainScreen({ user, plants, setPlants, onAddPlant, onShowStats }) {
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("");

  const handleDelete = (index) => {
    if (!window.confirm("Biztosan törlöd ezt a növényt?")) return;
    const updated = plants.filter((_, i) => i !== index);
    setPlants(updated);
  };

  const handleWater = (index) => {
    setPlants((prev) => {
      const updated = [...prev];
      const plant = updated[index];
      const nextDate = new Date();
      nextDate.setDate(nextDate.getDate() + Number(plant.frequency));
      plant.nextWatering = nextDate.toISOString();

      const users = JSON.parse(localStorage.getItem("users") || "{}");
      users[user].plants = updated;
      localStorage.setItem("users", JSON.stringify(users));
      return updated;
    });
  };

  // 🔍 Szűrés logika
  const filteredPlants = plants
    .filter((p) => p.owner === user)
    .filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.type.toLowerCase().includes(search.toLowerCase())
    )
    .filter((p) => (filterType ? p.type === filterType : true));

  const allTypes = [...new Set(plants.filter(p => p.owner === user).map(p => p.type))];

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        🌿 {user} növényei
      </Typography>

      {/* 🔍 Kereső és szűrő */}
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

      {filteredPlants.length === 0 ? (
        <Typography color="text.secondary" sx={{ mt: 2 }}>
          Nincs találat.
        </Typography>
      ) : (
        <Grid container spacing={2}>
          {filteredPlants.map((plant, index) => {
            const nextWaterDate = new Date(plant.nextWatering);
            const today = new Date();
            nextWaterDate.setHours(0, 0, 0, 0);
            today.setHours(0, 0, 0, 0);
            const diffDays = Math.floor((nextWaterDate - today) / (1000 * 60 * 60 * 24));

            let bgColor = "#e8f5e9";
            if (diffDays < 0) bgColor = "#ffebee";
            else if (diffDays === 0) bgColor = "#fff8e1";

            return (
              <Grid item xs={12} md={6} lg={4} key={index}>
                <Card sx={{ p: 2, backgroundColor: bgColor }}>
                  <Typography variant="h6">{plant.name}</Typography>
                  <Typography variant="body2">Típus: {plant.type}</Typography>
                  <Typography variant="body2">
                    Következő locsolás:{" "}
                    {new Date(plant.nextWatering).toLocaleDateString("hu-HU")}
                  </Typography>

                  {plant.image && (
                    <img
                      src={plant.image}
                      alt={plant.name}
                      style={{ width: "100%", borderRadius: 8, marginTop: 8 }}
                    />
                  )}

                  <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
                    <Button variant="contained" color="success" onClick={() => handleWater(index)}>
                      💧 Meglocsolva
                    </Button>
                    <Button variant="outlined" color="error" onClick={() => handleDelete(index)}>
                      Törlés
                    </Button>
                  </Box>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      )}

      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
        <Button variant="contained" color="success" startIcon={<AddCircleIcon />} onClick={onAddPlant}>
          Új növény
        </Button>
        <Button variant="outlined" onClick={onShowStats}>
          📊 Statisztika
        </Button>
      </Box>
    </Box>
  );
}
