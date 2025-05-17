import React, { useState, useEffect, useMemo } from "react";
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Grid,
  CircularProgress,
} from "@mui/material";
import { useInView } from "react-intersection-observer";
import { LaunchFilters } from "../components/LaunchFilters";
import { LaunchCard } from "../components/LaunchCard";
import { FavoriteLaunches } from "../components/FavoriteLaunches";
import { fetcherLaunches } from "../services/spacexApi"; // asegúrate que esté bien la ruta
import useSWR from "swr";
import { ITEMS_PER_BATCH } from "../constants";

function a11yProps(index: number) {
  return {
    id: `launch-tab-${index}`,
    "aria-controls": `launch-tabpanel-${index}`,
  };
}

type TabPanelProps = {
  children?: React.ReactNode;
  index: number;
  value: number;
};

function TabPanel({ children, value, index }: TabPanelProps) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`launch-tabpanel-${index}`}
      aria-labelledby={`launch-tab-${index}`}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export const Home = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [filters, setFilters] = useState({
    search: "",
    year: "",
    success: "",
  });
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_BATCH);
  const { ref, inView } = useInView({ triggerOnce: false });

  const {
    data: launches,
    isLoading,
    error,
  } = useSWR("launches", fetcherLaunches, {
    revalidateOnFocus: false,
    refreshInterval: 0,
  });

  // Cuando cambian filtros o pestaña reiniciamos visibleCount para mostrar desde 0
  useEffect(() => {
    setVisibleCount(ITEMS_PER_BATCH);
  }, [filters, tabIndex]);

  // Al hacer scroll hasta el loader, aumentamos visibleCount para cargar más
  useEffect(() => {
    if (inView) {
      setVisibleCount((prev) => prev + ITEMS_PER_BATCH);
    }
  }, [inView]);

  // Filtramos lanzamientos con memo para no recalcular en cada render
  const filteredLaunches = useMemo(() => {
    if (!launches) return [];
    return launches.filter((launch) => {
      if (
        filters.search &&
        !launch.name.toLowerCase().includes(filters.search.toLowerCase())
      ) {
        return false;
      }
      if (filters.year) {
        const launchYear = new Date(launch.date_utc).getFullYear().toString();
        if (launchYear !== filters.year) return false;
      }
      if (filters.success) {
        const isSuccess = filters.success === "true";

        if (launch.success !== isSuccess) return false;
      }
      return true;
    });
  }, [launches, filters]);

  // Solo mostramos los visibles
  const visibleLaunches = useMemo(
    () => filteredLaunches.slice(0, visibleCount),
    [filteredLaunches, visibleCount]
  );

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Tabs
        value={tabIndex}
        onChange={handleTabChange}
        aria-label="Lanzamientos y Favoritos"
        centered
      >
        <Tab label="Lanzamientos" {...a11yProps(0)} />
        <Tab label="Favoritos" {...a11yProps(1)} />
      </Tabs>

      <TabPanel value={tabIndex} index={0}>
        <LaunchFilters
          onFilterChange={(newFilters) =>
            setFilters((prev) => ({ ...prev, ...newFilters }))
          }
        />
        {isLoading ? (
          <Typography>Cargando lanzamientos...</Typography>
        ) : error ? (
          <Typography>Error al cargar los datos.</Typography>
        ) : filteredLaunches.length === 0 ? (
          <Typography>No se encontraron lanzamientos.</Typography>
        ) : (
          <Grid container spacing={2}>
            {visibleLaunches.map((launch) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={launch.id}>
                <LaunchCard launch={launch} />
              </Grid>
            ))}

            {/* Loader para lazy loading */}
            {visibleLaunches.length < filteredLaunches.length && (
              <Grid size={12} ref={ref}>
                <Box display="flex" justifyContent="center" py={4}>
                  <CircularProgress />
                </Box>
              </Grid>
            )}
          </Grid>
        )}
      </TabPanel>

      <TabPanel value={tabIndex} index={1}>
        <FavoriteLaunches />
      </TabPanel>
    </Box>
  );
};
