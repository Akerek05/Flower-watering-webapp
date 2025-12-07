// src/components/FilterBar.tsx
import { Box, TextField, MenuItem } from "@mui/material";

type FilterBarProps = {
  search: string;
  onSearchChange: (value: string) => void;
  filterType: string;
  onFilterTypeChange: (value: string) => void;
  types: string[];
};

export default function FilterBar({
  search,
  onSearchChange,
  filterType,
  onFilterTypeChange,
  types,
}: FilterBarProps) {
  return (
    <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
      <TextField
        label="Keresés név vagy típus szerint"
        variant="outlined"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        fullWidth
      />
      <TextField
        select
        label="Szűrés kategória szerint"
        value={filterType}
        onChange={(e) => onFilterTypeChange(e.target.value)}
        sx={{ minWidth: 200 }}
      >
        <MenuItem value="">Összes</MenuItem>
        {types.map((t, i) => (
          <MenuItem key={i} value={t}>
            {t}
          </MenuItem>
        ))}
      </TextField>
    </Box>
  );
}
