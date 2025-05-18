import { useState, useMemo } from "react";
import {
  GoogleMap,
  Marker,
  InfoWindow,
  useJsApiLoader,
} from "@react-google-maps/api";
import {
  Typography,
  Box,
  Paper,
  Divider,
  Stack,
  Link,
  CircularProgress,
} from "@mui/material";
import { LocationOn } from "@mui/icons-material";
import type { Launchpad, Launch } from "../../types";
import { useGetLaunchpads } from "../../hooks/useSWR";
import useFavorites from "../../hooks/useFavorites";
import { ApiStatusHandler } from "../../components/ApiStatusHandler";

const mapContainerStyle = { width: "100%", height: "100%", borderRadius: 12 };
const defaultCenter = { lat: 20, lng: 0 };

export const LaunchpadMap = () => {
  const { launchpads, isLoading, error } = useGetLaunchpads();
  const [selected, setSelected] = useState<Launchpad | null>(null);
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  const { favorites } = useFavorites();

  const favoriteLaunchpadIds = Array.from(
    new Set(favorites.map((launch) => launch.launchpad).filter(Boolean))
  );

  const filteredLaunchpads = launchpads?.filter((pad) =>
    favoriteLaunchpadIds.includes(pad.id)
  );

  const launchesForSelectedPad: Launch[] = useMemo(() => {
    if (!selected) return [];
    return favorites.filter((launch) => launch.launchpad === selected.id);
  }, [favorites, selected]);

  return (
    <ApiStatusHandler isLoading={isLoading} error={error} api={"Launchpad"}>
      {!isLoaded ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight={400}
        >
          <CircularProgress size={60} />
        </Box>
      ) : (
        <Box sx={{ position: "relative", height: "100%" }}>
          <GoogleMap
            zoom={2}
            center={defaultCenter}
            mapContainerStyle={mapContainerStyle}
            options={{
              disableDefaultUI: true,
              zoomControl: true,
            }}
          >
            {filteredLaunchpads?.map((pad) => (
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
                options={{ maxWidth: 360 }}
              >
                <Paper
                  elevation={6}
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    maxHeight: 400,
                    overflowY: "auto",
                  }}
                >
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
                        {selected.latitude.toFixed(4)},{" "}
                        {selected.longitude.toFixed(4)}
                      </Typography>
                    </Box>
                  </Stack>

                  {launchesForSelectedPad.length > 0 && (
                    <>
                      <Divider sx={{ my: 2 }} />
                      <Typography variant="subtitle1" fontWeight={600}>
                        Lanzamientos favoritos en esta base:
                      </Typography>
                      <Stack spacing={1} mt={1}>
                        {launchesForSelectedPad.map((launch, idx) => (
                          <Box key={idx}>
                            <Typography fontWeight={500}>
                              {launch.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {new Date(launch.date_utc).toLocaleString()}
                            </Typography>
                            {launch.links?.webcast && (
                              <Link
                                href={launch.links.webcast}
                                target="_blank"
                                rel="noopener"
                                underline="hover"
                              >
                                Ver video
                              </Link>
                            )}
                          </Box>
                        ))}
                      </Stack>
                    </>
                  )}
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
              {filteredLaunchpads?.length} plataformas favoritas
            </Typography>
          </Box>
        </Box>
      )}
    </ApiStatusHandler>
  );
};
