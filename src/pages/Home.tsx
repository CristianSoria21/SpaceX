import { useEffect, useState, useMemo } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Grid,
  CircularProgress,
  Box,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Tabs,
  Tab,
} from "@mui/material";
import { useInView } from "react-intersection-observer";

import type { Launch, Rocket } from "../types";
import { fetchLaunches, fetchRockets } from "../services/spacexApi";
import { useFavorites } from "../hooks/useFavorites";
import { LaunchCard } from "../sections/launches/LaunchCard";

const ITEMS_PER_BATCH = 12;

export default function Home() {
  const [launches, setLaunches] = useState<Launch[]>([]);
  const [rockets, setRockets] = useState<Rocket[]>([]);
  const [loading, setLoading] = useState(true);

  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_BATCH);
  const { ref, inView } = useInView({ triggerOnce: false });

  const [search, setSearch] = useState("");
  const [year, setYear] = useState("");
  const [rocketId, setRocketId] = useState("");
  const [result, setResult] = useState("");
  const [tab, setTab] = useState(0);

  const { favorites } = useFavorites();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [launchData, rocketData] = await Promise.all([
          fetchLaunches(),
          fetchRockets(),
        ]);
        setLaunches(launchData);
        setRockets(rocketData);
      } catch (error) {
        console.error("Error al obtener datos de SpaceX", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (inView) {
      setVisibleCount((prev) => prev + ITEMS_PER_BATCH);
    }
  }, [inView]);

  const filteredLaunches = useMemo(() => {
    const source = tab === 0 ? launches : favorites;
    return source.filter((launch) => {
      const matchesSearch = launch.name
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesYear = year
        ? new Date(launch.date_utc).getFullYear().toString() === year
        : true;
      const matchesRocket = rocketId ? launch.rocketId === rocketId : true;
      const matchesResult =
        result === ""
          ? true
          : result === "success"
          ? launch.success === true
          : launch.success === false;

      return matchesSearch && matchesYear && matchesRocket && matchesResult;
    });
  }, [launches, favorites, search, year, rocketId, result, tab]);

  const visibleLaunches = useMemo(
    () => filteredLaunches.slice(0, visibleCount),
    [filteredLaunches, visibleCount]
  );

  const years = useMemo(
    () =>
      Array.from(
        new Set(
          launches.map((l) => new Date(l.date_utc).getFullYear().toString())
        )
      ).sort(),
    [launches]
  );

  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6">🚀 SpaceX Dashboard</Typography>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 4 }}>
        <Tabs
          value={tab}
          onChange={(_, newValue) => {
            setTab(newValue);
            setVisibleCount(ITEMS_PER_BATCH); // reiniciar conteo al cambiar pestaña
          }}
          sx={{ mb: 3 }}
        >
          <Tab label="Todos los lanzamientos" />
          <Tab label="Favoritos" />
        </Tabs>

        {/* Filtros */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid size={{ xs: 12, sm: 3 }}>
            <TextField
              label="Buscar misión"
              fullWidth
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setVisibleCount(ITEMS_PER_BATCH);
              }}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 3 }}>
            <FormControl fullWidth>
              <InputLabel>Año</InputLabel>
              <Select
                value={year}
                onChange={(e) => {
                  setYear(e.target.value);
                  setVisibleCount(ITEMS_PER_BATCH);
                }}
                label="Año"
              >
                <MenuItem value="">Todos</MenuItem>
                {years.map((y) => (
                  <MenuItem key={y} value={y}>
                    {y}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, sm: 3 }}>
            <FormControl fullWidth>
              <InputLabel>Resultado</InputLabel>
              <Select
                value={result}
                onChange={(e) => {
                  setResult(e.target.value);
                  setVisibleCount(ITEMS_PER_BATCH);
                }}
                label="Resultado"
              >
                <MenuItem value="">Todos</MenuItem>
                <MenuItem value="success">Éxito</MenuItem>
                <MenuItem value="failure">Fallo</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, sm: 3 }}>
            <FormControl fullWidth>
              <InputLabel>Cohete</InputLabel>
              <Select
                value={rocketId}
                onChange={(e) => {
                  setRocketId(e.target.value);
                  setVisibleCount(ITEMS_PER_BATCH);
                }}
                label="Cohete"
              >
                <MenuItem value="">Todos</MenuItem>
                {rockets.map((r) => (
                  <MenuItem key={r.id} value={r.id}>
                    {r.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        {/* Resultados */}
        {loading ? (
          <Box display="flex" justifyContent="center" mt={4}>
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={2}>
            {visibleLaunches.map((launch) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={launch.id}>
                <LaunchCard launch={launch} />
              </Grid>
            ))}

            {/* Loader al final para lazy loading */}
            {visibleLaunches.length < filteredLaunches.length && (
              <Grid size={12} ref={ref}>
                <Box display="flex" justifyContent="center" py={4}>
                  <CircularProgress />
                </Box>
              </Grid>
            )}
          </Grid>
        )}
      </Container>
    </>
  );
}
