// src/components/StatsScreen.jsx
import { Box, Typography, Button } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function StatsScreen({ user, plants, onBack }) {
  // Összeszámolja, hogy hány növény milyen gyakoriságú locsolást igényel
  const dataMap = {};

  plants
    .filter((p) => p.owner === user)
    .forEach((p) => {
      const freq = parseInt(p.frequency);
      let label = "Egyéb";

      if (freq <= 2) label = "Napi";
      else if (freq <= 7) label = "Heti";
      else label = "Havi";

      dataMap[label] = (dataMap[label] || 0) + 1;
    });

  const data = Object.keys(dataMap).map((key) => ({
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
