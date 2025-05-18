import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Grid,
  CircularProgress,
} from "@mui/material";
import { useInView } from "react-intersection-observer";
import { LaunchFilters } from "./components/LaunchFilters";
import { LaunchCard } from "./components/LaunchCard";
import { FavoriteLaunches } from "./components/FavoriteLaunches";
import { LaunchpadMap } from "./components/LaunchpadMap";
import { ITEMS_PER_BATCH } from "./constants";
import { useGetLaunches, useGetRockets } from "./hooks/useSWR";
import { useFilters } from "./hooks/useFilters";
import type { Filters, Rocket } from "./types";

type TabPanelProps = {
  children?: React.ReactNode;
  value: number;
  index: number;
};

const TabPanel = ({ children, value, index }: TabPanelProps) => {
  if (value !== index) return null;
  return (
    <Box
      role="tabpanel"
      id={`launch-tabpanel-${index}`}
      aria-labelledby={`launch-tab-${index}`}
      sx={{ p: 3, height: "100%", overflowY: "auto" }}
    >
      {children}
    </Box>
  );
};

const App = () => {
  const { ref, inView } = useInView();
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_BATCH);
  const [tabIndex, setTabIndex] = useState(0);
  const [filters, setFilters] = useState<Filters>({
    search: "",
    year: "",
    success: "",
    rocket: "",
  });

  const {
    launches,
    error: errorLaunch,
    isLoading: loadingLaunch,
  } = useGetLaunches();
  const { rockets } = useGetRockets();

  const filteredLaunches = useFilters(launches ?? [], rockets, filters);

  const handleFilterChange = useCallback(
    (newFilters: Partial<typeof filters>) => {
      setFilters((prev) => ({ ...prev, ...newFilters }));
    },
    []
  );

  const visibleLaunches = useMemo(
    () => filteredLaunches.slice(0, visibleCount),
    [filteredLaunches, visibleCount]
  );

  const renderLaunches = () => {
    if (loadingLaunch) return <Typography>Cargando lanzamientos...</Typography>;
    if (errorLaunch) return <Typography>Error al cargar los datos.</Typography>;
    if (!filteredLaunches.length)
      return <Typography>No se encontraron lanzamientos.</Typography>;

    return (
      <Grid container spacing={2}>
        {visibleLaunches.map((launch) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={launch.id}>
            <LaunchCard
              launch={launch}
              rocket={rockets?.find(
                (rocket: Rocket) => rocket.id === launch.rocket
              )}
            />
          </Grid>
        ))}

        {visibleLaunches.length < filteredLaunches.length && (
          <Grid size={12} ref={ref}>
            <Box display="flex" justifyContent="center" py={4}>
              <CircularProgress />
            </Box>
          </Grid>
        )}
      </Grid>
    );
  };

  useEffect(() => {
    setVisibleCount(ITEMS_PER_BATCH);
  }, [filters, tabIndex]);

  useEffect(() => {
    if (inView) {
      setVisibleCount((prev) => prev + ITEMS_PER_BATCH);
    }
  }, [inView]);

  return (
    <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 2,
          borderBottom: 1,
          borderColor: "divider",
        }}
      >
        <Typography variant="h6">SpaceX by Cristian Soria</Typography>

        <Tabs
          value={tabIndex}
          onChange={(_, newValue) => setTabIndex(newValue)}
          aria-label="Lanzamientos y Favoritos"
          textColor="primary"
          indicatorColor="primary"
        >
          <Tab label="Lanzamientos" />
          <Tab label="Favoritos" />
          <Tab label="Bases de lanzamientos" />
        </Tabs>
      </Box>

      {tabIndex === 0 && (
        <Box sx={{ p: 2, borderBottom: 1, borderColor: "divider" }}>
          <LaunchFilters
            onFilterChange={handleFilterChange}
            rockets={rockets}
          />
        </Box>
      )}

      <Box sx={{ flex: 1, overflow: "hidden" }}>
        <TabPanel value={tabIndex} index={0}>
          {renderLaunches()}
        </TabPanel>

        <TabPanel value={tabIndex} index={1}>
          <FavoriteLaunches rockets={rockets} />
        </TabPanel>

        <TabPanel value={tabIndex} index={2}>
          <LaunchpadMap />
        </TabPanel>
      </Box>
    </Box>
  );
};

export default App;
