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
import type { Plant } from "../App";

type StatsScreenProps = {
  user: string;
  plants: Plant[];
  onBack: () => void;
};

type StatItem = {
  name: string;
  count: number;
};

export default function StatsScreen({ user, plants, onBack }: StatsScreenProps) {
  const dataMap: Record<string, number> = {};

  plants
    .filter((p) => p.owner === user)
    .forEach((p) => {
      const freq = parseInt(p.frequency, 10);
      let label = "Egyéb";

      if (freq <= 2) label = "Napi";
      else if (freq <= 7) label = "Heti";
      else label = "Havi";

      dataMap[label] = (dataMap[label] || 0) + 1;
    });

  const data: StatItem[] = Object.keys(dataMap).map((key) => ({
    name: key,
    count: dataMap[key],
  }));

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        📊 Locsolási statisztikák
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
            <Bar dataKey="count" fill="#81c784" />
          </BarChart>
        </ResponsiveContainer>
      )}

      <Button variant="outlined" onClick={onBack} sx={{ mt: 3 }}>
        ← Vissza
      </Button>
    </Box>
  );
}
