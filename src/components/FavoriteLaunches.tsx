import { Typography, Box } from "@mui/material";
import { useFavorites } from "../hooks/useFavorites";
import { LaunchCard } from "./LaunchCard";

export const FavoriteLaunches = () => {
  const { favorites } = useFavorites();

  return (
    <Box mt={4}>
      <Typography variant="h5" mb={2}>
        Favoritos
      </Typography>
      {favorites.length === 0 ? (
        <Typography variant="body2">No hay lanzamientos favoritos.</Typography>
      ) : (
        favorites.map((launch) => (
          <LaunchCard key={launch.id} launch={launch} />
        ))
      )}
    </Box>
  );
};
