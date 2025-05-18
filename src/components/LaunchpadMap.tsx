import { useState, useMemo } from "react";
import {
  GoogleMap,
  Marker,
  InfoWindow,
  useJsApiLoader,
} from "@react-google-maps/api";
import {
  CircularProgress,
  Typography,
  Box,
  Paper,
  Divider,
  Stack,
} from "@mui/material";
import { LocationOn, SatelliteAlt } from "@mui/icons-material";
import type { Launchpad } from "../types";
import { useGetLaunchpads } from "../hooks/useSWR";

const mapContainerStyle = { width: "100%", height: "100%", borderRadius: 12 };
const defaultCenter = { lat: 20, lng: 0 };

export const LaunchpadMap = () => {
  const { launchpads, isLoading, error } = useGetLaunchpads();
  const [selected, setSelected] = useState<Launchpad | null>(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  const mapOptions = useMemo<google.maps.MapOptions>(
    () => ({
      styles: [
        {
          featureType: "administrative",
          elementType: "labels",
          stylers: [{ visibility: "simplified" }],
        },
      ],
      disableDefaultUI: true,
      zoomControl: true,
    }),
    []
  );

  if (!isLoaded || isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight={400}
      >
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight={400}
        p={3}
      >
        <SatelliteAlt color="error" sx={{ fontSize: 60, mb: 2 }} />
        <Typography variant="h4" color="error" align="center" gutterBottom>
          Error al cargar los datos
        </Typography>
        <Typography variant="h6" color="text.secondary" align="center">
          No se pudieron cargar las plataformas de lanzamiento. Intenta
          recargando la página.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ position: "relative", height: "100%" }}>
      <GoogleMap
        zoom={2}
        center={defaultCenter}
        mapContainerStyle={mapContainerStyle}
        options={mapOptions}
      >
        {launchpads?.map((pad) => (
          <Marker
            key={pad.id}
            position={{ lat: pad.latitude, lng: pad.longitude }}
            onClick={() => setSelected(pad)}
          />
        ))}

        {selected && (
          <InfoWindow
            position={{ lat: selected.latitude, lng: selected.longitude }}
            onCloseClick={() => setSelected(null)}
            options={{ maxWidth: 320 }}
          >
            <Paper elevation={6} sx={{ p: 2, borderRadius: 2 }}>
              <Stack direction="row" alignItems="center" spacing={1} mb={1}>
                <LocationOn color="primary" />
                <Typography variant="h6" fontWeight={600}>
                  {selected.name}
                </Typography>
              </Stack>

              <Divider sx={{ my: 1 }} />

              <Stack spacing={1.5}>
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Ubicación
                  </Typography>
                  <Typography>
                    {selected.locality}, {selected.region}
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Coordenadas
                  </Typography>
                  <Typography>
                    {selected.latitude.toFixed(4)},
                    {selected.longitude.toFixed(4)}
                  </Typography>
                </Box>
              </Stack>
            </Paper>
          </InfoWindow>
        )}
      </GoogleMap>

      <Box
        sx={{
          position: "absolute",
          top: 16,
          right: 16,
          zIndex: 1,
          bgcolor: "background.paper",
          p: 1,
          borderRadius: 1,
          boxShadow: 3,
        }}
      >
        <Typography variant="subtitle1" color="text.secondary">
          {launchpads?.length} plataformas
        </Typography>
      </Box>
    </Box>
  );
};
