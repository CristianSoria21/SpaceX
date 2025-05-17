import { Typography, Box } from "@mui/material";
import { useFavorites } from "../hooks/useFavorites";
import { LaunchCard } from "./LaunchCard";
import { Grid } from "@mui/material";
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
        <Grid container spacing={2}>
          {favorites.map((launch) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={launch.id}>
              <LaunchCard launch={launch} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};
