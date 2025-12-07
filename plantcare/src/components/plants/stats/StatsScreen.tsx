import { Box, Typography, Button } from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { Plant } from "../../../types/plant";


type StatsScreenProps = {
  user: string;
  plants: Plant[];
  onBack: () => void;
};

type StatItem = {
  name: string;
  waterCount: number;
};
/**
 * Statisztikai képernyő a locsolások számáról növényenként.
 *
 * - Oszlopdiagramot jelenít meg Recharts segítségével.
 * - Minden oszlop egy növény, az érték a `waterCount`.
 */
export default function StatsScreen({ user, plants, onBack }: StatsScreenProps) {
   /** Az aktuális user növényeiből készített statisztikai sorok. */
  const data: StatItem[] = plants
    .filter((p) => p.owner === user)
    .map((p) => ({
      name: p.name,
      waterCount: p.waterCount ?? 0,
    }));

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        📊 Locsolások növényenként
      </Typography>

      {data.length === 0 ? (
        <Typography color="text.secondary" sx={{ mt: 2 }}>
          Még nincs növényed, ezért nincs mit megjeleníteni.
        </Typography>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="waterCount" fill="#81c784" />
          </BarChart>
        </ResponsiveContainer>
      )}

      <Button variant="outlined" onClick={onBack} sx={{ mt: 3 }}>
        ← Vissza
      </Button>
    </Box>
  );
}
