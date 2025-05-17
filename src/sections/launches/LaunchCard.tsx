import { Card, CardContent, Typography, IconButton } from "@mui/material";
import { Star, StarBorder } from "@mui/icons-material";
import type { Launch } from "../../types";

import { useFavorites } from "../../hooks/useFavorites";

type Props = {
  launch: Launch;
};

export const LaunchCard = ({ launch }: Props) => {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();

  const toggleFavorite = () => {
    isFavorite(launch.id) ? removeFavorite(launch.id) : addFavorite(launch);
  };

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6">{launch.name}</Typography>
        <Typography variant="body2" color="text.secondary">
          Fecha: {new Date(launch.date_utc).toLocaleDateString()}
        </Typography>
        <Typography variant="body2" color={launch.success ? "green" : "red"}>
          {launch.success ? "Éxito" : "Fallo"}
        </Typography>
        <IconButton onClick={toggleFavorite} aria-label="Favorito">
          {isFavorite(launch.id) ? <Star color="warning" /> : <StarBorder />}
        </IconButton>
      </CardContent>
    </Card>
  );
};
