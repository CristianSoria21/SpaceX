/**
 * Componente que muestra la lista de lanzamientos marcados como favoritos.
 * Si no hay favoritos, muestra un mensaje indicándolo.
 *
 * @param rockets - Arreglo opcional de cohetes para relacionar con cada lanzamiento.
 */
import { Typography, Box, Grid } from "@mui/material";
import useFavorites from "../../hooks/useFavorites";
import { LaunchCard } from "./LaunchCard";
import type { Launch, Rocket } from "../../types";
import { Star, StarBorder } from "@mui/icons-material";

export const FavoriteLaunches = ({
  rockets,
}: {
  rockets: Rocket[] | undefined;
}) => {
  const { favorites } = useFavorites();
  return (
    <Box textAlign="center">
      {favorites.length === 0 ? (
        <Box sx={{ pt: 20, maxWidth: 500, margin: "auto" }}>
          <StarBorder color="disabled" sx={{ fontSize: 60, mb: 2 }} />
          <Typography variant="h6" gutterBottom color="text.secondary">
            ¡Aún no tienes favoritos!
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Marca tus lanzamientos favoritos haciendo clic en el ícono
            <Star fontSize="small" color="disabled" sx={{ mx: 1 }} />
            cuando explores los próximos lanzamientos.
          </Typography>
        </Box>
      ) : (
        <>
          <Typography variant="h5" mb={3}>
            Lanzamientos Favoritos
          </Typography>
          <Grid container spacing={2}>
            {favorites.map((launch: Launch) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={launch.id}>
                <LaunchCard
                  launch={launch}
                  rocket={rockets?.find(
                    (rocket: Rocket) => rocket.id === launch.rocket
                  )}
                />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Box>
  );
};
