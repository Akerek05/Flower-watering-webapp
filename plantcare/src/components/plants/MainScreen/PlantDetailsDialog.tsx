import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
} from "@mui/material";
import type { ChangeEvent } from "react";
import type { Plant } from "../../../types/plant";


type PlantDetailsDialogProps = {
  open: boolean;
  plant: Plant | null;
  onClose: () => void;
  onSave: () => void;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
};
/**
 * Dialógus egy kiválasztott növény adatainak megtekintéséhez és szerkesztéséhez.
 *
 * - Név, típus, locsolási gyakoriság, megjegyzés módosítása.
 * - Előnézetben megjeleníti a jelenlegi képet (ha van).
 */
export default function PlantDetailsDialog({
  open,
  plant,
  onClose,
  onSave,
  onChange,
}: PlantDetailsDialogProps) {
  if (!plant) return null;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{plant.name} – részletek</DialogTitle>
      <DialogContent dividers>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          <TextField label="Név" name="name" value={plant.name} onChange={onChange} />
          <TextField label="Típus" name="type" value={plant.type} onChange={onChange} />
          <TextField
            label="Locsolási gyakoriság (nap)"
            name="frequency"
            value={plant.frequency}
            onChange={onChange}
          />
          <TextField
            label="Útmutató / megjegyzés"
            name="note"
            value={plant.note || ""}
            onChange={onChange}
            multiline
            minRows={3}
          />

          {plant.image && (
            <Box sx={{ mt: 1 }}>
              <Typography variant="subtitle2">Jelenlegi kép</Typography>
              <img
                src={plant.image}
                alt={plant.name}
                style={{ maxWidth: "100%", borderRadius: 8, marginTop: 4 }}
              />
            </Box>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Mégse</Button>
        <Button variant="contained" onClick={onSave}>
          Mentés
        </Button>
      </DialogActions>
    </Dialog>
  );
}
