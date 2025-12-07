import { Box, TextField, Button, Typography } from "@mui/material";
import type { ChangeEvent, FormEvent } from "react";
import type { FormPlant } from "./PlantForm";

type PlantFormFieldsProps = {
  plant: FormPlant;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onImageChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBack: () => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
};

export default function PlantFormFields({
  plant,
  onChange,
  onImageChange,
  onBack,
  onSubmit,
}: PlantFormFieldsProps) {
  return (
    <Box
      component="form"
      onSubmit={onSubmit}
      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
    >
      <TextField name="name" label="Név" value={plant.name} onChange={onChange} />
      <TextField name="type" label="Típus" value={plant.type} onChange={onChange} />
      <TextField
        name="frequency"
        label="Locsolási gyakoriság (nap)"
        value={plant.frequency}
        onChange={onChange}
      />
      <TextField
        name="note"
        label="Útmutató / megjegyzés"
        value={plant.note}
        onChange={onChange}
        multiline
        minRows={3}
      />

      <Button variant="outlined" component="label">
        Kép feltöltése
        <input type="file" hidden accept="image/*" onChange={onImageChange} />
      </Button>

      {plant.image && (
        <Box sx={{ mt: 1 }}>
          <Typography variant="subtitle2">Előnézet</Typography>
          <div className="preview-wrapper">
            <img src={plant.image} alt="preview" />
          </div>
        </Box>
      )}

      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
        <Button variant="outlined" onClick={onBack}>
          Vissza
        </Button>
        <Button variant="contained" color="success" type="submit">
          Mentés
        </Button>
      </Box>
    </Box>
  );
}
