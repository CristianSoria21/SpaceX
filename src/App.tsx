import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Box, Grid, CircularProgress } from "@mui/material";
import { useInView } from "react-intersection-observer";
import { LaunchFilters } from "./sections/launches/LaunchFilters";
import { LaunchCard } from "./sections/launches/LaunchCard";
import { FavoriteLaunches } from "./sections/launches/FavoriteLaunches";
import { LaunchpadMap } from "./sections/launchpad/LaunchpadMap";
import { ITEMS_PER_BATCH } from "./constants";
import { useGetLaunches, useGetRockets } from "./hooks/useSWR";
import { useFilters } from "./hooks/useFilters";
import { ApiStatusHandler } from "./components/ApiStatusHandler";
import Header from "./components/Header";

type TabPanelProps = {
  children?: React.ReactNode;
  value: number;
  index: number;
};

/**
 * Componente auxiliar para mostrar el contenido de una pestaña.
 * @param {React.ReactNode} [props.children] - Contenido que se muestra cuando la pestaña está activa.
 * @param {number} props.value - Índice actual de la pestaña activa.
 * @param {number} props.index - Índice de esta pestaña.
 */
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

/**
 * Componente principal de la aplicación que muestra lanzamientos,
 * pestañas para favoritos y mapa de plataformas de lanzamiento.
 * @returns {JSX.Element} Componente de la aplicación.
 */
const App = () => {
  const { ref, inView } = useInView();
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_BATCH);
  const [tabIndex, setTabIndex] = useState(0);
  const [filters, setFilters] = useState({
    search: "",
    year: "",
    success: "",
    rocket: "",
  });

  const { launches, error, isLoading } = useGetLaunches();
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

  const renderLaunches = () => (
    <Grid container spacing={2}>
      {visibleLaunches.map((launch) => (
        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={launch.id}>
          <LaunchCard
            launch={launch}
            rocket={rockets?.find((rocket) => rocket.id === launch.rocket)}
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

  useEffect(() => {
    setVisibleCount(ITEMS_PER_BATCH);
  }, [filters, tabIndex]);

  useEffect(() => {
    if (inView) {
      setVisibleCount((prev) => prev + ITEMS_PER_BATCH);
    }
  }, [inView]);

  return (
    <ApiStatusHandler isLoading={isLoading} error={error} api="Launches">
      <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
        <Header setTabIndex={setTabIndex} tabIndex={tabIndex} />

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
    </ApiStatusHandler>
  );
};

export default App;
