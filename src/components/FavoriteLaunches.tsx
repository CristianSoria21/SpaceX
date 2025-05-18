import { Typography, Box, Grid } from "@mui/material";
import useFavorites from "../hooks/useFavorites"; 
import { LaunchCard } from "./LaunchCard"; 
import type { Launch } from "../types";
export const FavoriteLaunches = () => {
  const { favorites } = useFavorites();

  return (
    <Box mt={4}>
      <Typography variant="h5" mb={2}>
        Lanzamientos Favoritos
      </Typography>

      {favorites.length === 0 ? (
        <Typography variant="body2" color="text.secondary">
          No hay lanzamientos marcados como favoritos.
        </Typography>
      ) : (
        <Grid container spacing={2}>
          {favorites.map((launch: Launch) => (
            <Grid size={4} key={launch.id}>
              <LaunchCard launch={launch} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};
