import { useState } from "react";
import {
  TextField,
  MenuItem,
  Grid,
  Button,
  useTheme,
  useMediaQuery,
  Alert,
  Snackbar,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import type { Rocket, Filters } from "../../types";

type Props = {
  onFilterChange: (filters: Filters) => void;
  rockets: Rocket[] | undefined;
};

export const LaunchFilters = ({ onFilterChange, rockets }: Props) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [year, setYear] = useState<Date | null>(null);
  const [search, setSearch] = useState("");
  const [success, setSuccess] = useState("");
  const [rocket, setRocket] = useState("");
  const [error, setError] = useState<string | null>(null);

  const validateSearchInput = (input: string): boolean => {
    const regex = /^[a-zA-Z0-9\s-]*$/; // Solo letras, números, espacios y guiones
    return regex.test(input);
  };

  const validateYear = (date: Date | null): boolean => {
    if (!date) return true;
    const year = date.getFullYear();
    return year >= 1950 && year <= new Date().getFullYear();
  };

  const showError = (message: string) => {
    setError(message);
    setTimeout(() => setError(null), 5000);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (validateSearchInput(value)) {
      setSearch(value);
      onFilterChange({ search: value });
    } else {
      showError("Solo se permiten letras, números y guiones en la búsqueda");
    }
  };

  const handleYearChange = (newValue: Date | null) => {
    if (validateYear(newValue)) {
      setYear(newValue);
      onFilterChange({
        year: newValue ? newValue.getFullYear().toString() : "",
      });
    } else {
      showError(`El año debe estar entre 1950 y ${new Date().getFullYear()}`);
    }
  };

  const handleClear = () => {
    setYear(null);
    setSearch("");
    setSuccess("");
    setRocket("");
    onFilterChange({ year: "", search: "", success: "", rocket: "" });
  };

  return (
    <>
      <Grid container alignItems="center" spacing={2}>
        <Grid size={{ xs: 6, md: 2 }}>
          <TextField
            size={isMobile ? "small" : "medium"}
            label="Buscar por nombre"
            variant="outlined"
            fullWidth
            value={search}
            onChange={handleSearchChange}
            inputProps={{ maxLength: 20 }}
          />
        </Grid>

        <Grid size={{ xs: 6, md: 2 }}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              views={["year"]}
              label="Año"
              value={year}
              onChange={handleYearChange}
              maxDate={new Date()} 
              minDate={new Date(1950, 0, 1)} 
              slotProps={{
                textField: {
                  fullWidth: true,
                  size: isMobile ? "small" : "medium",
                },
              }}
            />
          </LocalizationProvider>
        </Grid>

        <Grid size={{ xs: 6, md: 2 }}>
          <TextField
            label="Resultado"
            select
            fullWidth
            size={isMobile ? "small" : "medium"}
            value={success}
            onChange={(e) => {
              setSuccess(e.target.value);
              onFilterChange({ success: e.target.value });
            }}
          >
            <MenuItem value="">Todos</MenuItem>
            <MenuItem value="true">Éxito</MenuItem>
            <MenuItem value="false">Fallo</MenuItem>
          </TextField>
        </Grid>

        <Grid size={{ xs: 6, md: 2 }}>
          <TextField
            label="Cohete"
            select
            fullWidth
            value={rocket}
            size={isMobile ? "small" : "medium"}
            onChange={(e) => {
              setRocket(e.target.value);
              onFilterChange({ rocket: e.target.value });
            }}
          >
            <MenuItem value="">Todos</MenuItem>
            {rockets?.map((r) => (
              <MenuItem key={r.id} value={r.name}>
                {r.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid size={{ xs: 12, md: 2 }}>
          <Button
            sx={{ width: "100%" }}
            size={isMobile ? "small" : "medium"}
            variant="outlined"
            color="primary"
            onClick={handleClear}
          >
            Limpiar filtros
          </Button>
        </Grid>
      </Grid>

      {/* Notificación de errores */}
      <Snackbar
        open={!!error}
        autoHideDuration={5000}
        onClose={() => setError(null)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="error" sx={{ width: "100%" }}>
          {error}
        </Alert>
      </Snackbar>
    </>
  );
};
