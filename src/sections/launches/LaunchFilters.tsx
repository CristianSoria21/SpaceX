import { useState } from "react";
import {
  TextField,
  MenuItem,
  Grid,
  Button,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import type { Rocket } from "../types";

type Props = {
  onFilterChange: (filters: {
    year?: string;
    success?: string;
    rocket?: string;
    search?: string;
  }) => void;

  rockets: Rocket[] | undefined;
};

export const LaunchFilters = ({ onFilterChange, rockets }: Props) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [year, setYear] = useState<Date | null>(null);
  const [search, setSearch] = useState("");
  const [success, setSuccess] = useState("");
  const [rocket, setRocket] = useState("");

  const handleClear = () => {
    setYear(null);
    setSearch("");
    setSuccess("");
    setRocket("");
    onFilterChange({ year: "", search: "", success: "", rocket: "" });
  };

  return (
    <Grid container alignItems="center" spacing={2}>
      <Grid size={{ xs: 12, md: 3 }}>
        <TextField
          size={isMobile ? "small" : "medium"}
          label="Buscar por nombre"
          variant="outlined"
          fullWidth
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            onFilterChange({ search: e.target.value });
          }}
        />
      </Grid>

      <Grid size={{ xs: 12, md: 2 }}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            views={["year"]}
            label="Año"
            value={year}
            onChange={(newValue) => {
              setYear(newValue);
              onFilterChange({
                year: newValue ? newValue.getFullYear().toString() : "",
              });
            }}
            slotProps={{
              textField: {
                fullWidth: true,
                size: isMobile ? "small" : "medium",
              },
            }}
          />
        </LocalizationProvider>
      </Grid>

      <Grid size={{ xs: 12, md: 2 }}>
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

      <Grid size={{ xs: 12, md: 2 }}>
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
  );
};
