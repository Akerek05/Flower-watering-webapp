import { useState, ChangeEvent } from "react";
import { Box, Typography, Button, Grid } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import "./MainScreen.css";
import PlantCard from "./PlantCard";
import PlantDetailsDialog from "./PlantDetailsDialog";
import TodayPlants from "./TodayPlants";
import FilterBar from "./FilterBar";
import type { Plant } from "../../../types/plant";

type MainScreenProps = {
  user: string;
  plants: Plant[];
  setPlants: React.Dispatch<React.SetStateAction<Plant[]>>;
  onAddPlant: () => void;
  onShowStats: () => void;
  onShowCalendar: () => void;
};
/**
 * Fő növénylista képernyő.
 *
 * - Megjeleníti az aktuális felhasználó növényeit.
 * - Keresés és típus szerinti szűrés.
 * - Locsolás, törlés, részletek szerkesztése.
 * - Alul új növény hozzáadása, statisztika és naptár elérése.
 */
export default function MainScreen({
  user,
  plants,
  setPlants,
  onAddPlant,
  onShowStats,
  onShowCalendar,
}: MainScreenProps) {
   /** Keresőmező szövege (név vagy típus szerint). */
  const [search, setSearch] = useState("");
   /** Kiválasztott típus szerinti szűrés. */
  const [filterType, setFilterType] = useState("");
  /** Szerkesztett növény indexe a listában (null, ha nincs kiválasztva). */
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  /** Szerkesztés alatt lévő növény adatai. */
  const [editPlant, setEditPlant] = useState<Plant | null>(null);
 /**
   * Törli a megadott indexű növényt megerősítés után.
   */
  const handleDelete = (index: number) => {
    if (!window.confirm("Biztosan törlöd ezt a növényt?")) return;
    const updated = plants.filter((_, i) => i !== index);
    setPlants(updated);
  };
  /**
   * Megjelöli a növényt locsoltnak:
   * - frissíti a következő locsolás dátumát,
   * - növeli a `waterCount` értékét,
   * - elmenti a változásokat a localStorage-be.
   */
  const handleWater = (index: number) => {
    setPlants((prev) => {
      const updated = [...prev];
      const plant = updated[index];
      const nextDate = new Date();
      nextDate.setDate(nextDate.getDate() + Number(plant.frequency));
      plant.nextWatering = nextDate.toISOString();
      plant.waterCount = (plant.waterCount ?? 0) + 1;

      const users = JSON.parse(localStorage.getItem("users") || "{}") as Record<
        string,
        { plants?: Plant[] }
      >;
      users[user].plants = updated;
      localStorage.setItem("users", JSON.stringify(users));
      return updated;
    });
  };
   /**
   * Beállítja szerkesztésre a kiválasztott növényt.
   */
  const handleDetails = (index: number) => {
    setSelectedIndex(index);
    setEditPlant({ ...plants[index] });
  };
  /**
   * A részletek dialógusban lévő input mezők változását kezeli.
   */
  const handleDetailsChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEditPlant((prev) => (prev ? { ...prev, [name]: value } : prev));
  };
  /**
   * Elmenti a szerkesztett növény adatait, frissíti a listát
   * és a localStorage-ben tárolt felhasználói adatokat.
   */
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
   /**
   * Bezárja a részletek dialógust mentés nélkül.
   */
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

      <FilterBar
        search={search}
        onSearchChange={setSearch}
        filterType={filterType}
        onFilterTypeChange={setFilterType}
        types={allTypes}
      />

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

      <Typography variant="h6" sx={{ mt: 4 }}>
        ✅ Ma esedékes locsolások
      </Typography>
      <TodayPlants user={user} plants={plants} />

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
