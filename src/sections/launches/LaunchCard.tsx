/**
 * Componente que muestra la información detallada de un lanzamiento.
 * @param launch - Objeto de tipo Launch con los datos del lanzamiento
 * @param rocket - Objeto de tipo Rocket asociado al lanzamiento (opcional)
 */
import {
  Card,
  Grid,
  CardContent,
  Typography,
  IconButton,
  Chip,
  Box,
  Stack,
} from "@mui/material";
import { Star, StarBorder } from "@mui/icons-material";
import type { Launch, Rocket } from "../../types";
import useFavorites from "../../hooks/useFavorites";

type Props = {
  launch: Launch;
  rocket: Rocket | undefined;
};

export const LaunchCard = ({ launch, rocket }: Props) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(launch.id);

  return (
    <Card
      sx={{
        borderRadius: 3,
        minHeight: 250,
        transition: "0.3s",
        background: "#232362",
        color: "white",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: 6,
        },
      }}
    >
      <CardContent>
        <Stack direction="row" justifyContent={"space-between"}>
          <Stack direction={"row"} spacing={1} alignItems="center">
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                toggleFavorite(launch);
              }}
              aria-label={"toggle-favorite"}
              sx={{
                p: 0,
                color: favorite ? "warning.main" : "grey.400",
                "&:hover": { color: "warning.light" },
              }}
            >
              {favorite ? <Star /> : <StarBorder />}
            </IconButton>
            <Typography variant="h6" fontWeight={700}>
              {launch.name}
            </Typography>
          </Stack>
          <Chip
            label={launch.success ? "ÉXITO" : "FALLO"}
            sx={{
              bgcolor: launch.success ? "success.main" : "error.main",
              color: "white",
              fontSize: "0.75rem",
              height: 24,
            }}
          />
        </Stack>

        <Typography variant="body1" color="grey.300" mb={1}>
          {new Date(launch.date_utc).toLocaleDateString("es-ES", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Typography>

        <Typography variant="subtitle2" color="grey.300" mb={1}>
          Cohete: <strong>{rocket?.name ?? "Desconocido"}</strong>
        </Typography>

        <Grid
          container
          spacing={2}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Grid size={9}>
            {launch.details && (
              <Typography
                variant="body2"
                color="grey.400"
                sx={{
                  display: "-webkit-box",
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {launch.details}
              </Typography>
            )}
          </Grid>

          <Grid size={"auto"}>
            {launch.links?.patch?.small && (
              <Box
                sx={{
                  width: 72,
                  height: 72,
                }}
              >
                <img
                  src={launch.links.patch.small}
                  alt={`Insignia de ${launch.name}`}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />
              </Box>
            )}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
