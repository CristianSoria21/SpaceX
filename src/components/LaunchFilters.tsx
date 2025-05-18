import { useState } from "react";
import { TextField, MenuItem, Grid, Button } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

type Props = {
  onFilterChange: (filters: {
    year?: string;
    success?: string;
    rocket?: string;
    search?: string;
  }) => void;
};

export const LaunchFilters = ({ onFilterChange }: Props) => {
  const [year, setYear] = useState<Date | null>(null);
  const [search, setSearch] = useState("");
  const [success, setSuccess] = useState("");

  const handleClear = () => {
    setYear(null);
    setSearch("");
    setSuccess("");
    onFilterChange({ year: "", search: "", success: "" });
  };

  return (
    <Grid container alignItems="center" spacing={2}>
      <Grid size={{ xs: 12, md: 3 }}>
        <TextField
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
      <Grid size={{ xs: 12, md: 3 }}>
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
              textField: { fullWidth: true, sx: { minWidth: 120 } },
            }}
          />
        </LocalizationProvider>
      </Grid>
      <Grid size={{ xs: 12, md: 3 }}>
        <TextField
          label="Resultado"
          select
          fullWidth
          value={success}
          onChange={(e) => {
            setSuccess(e.target.value);
            onFilterChange({ success: e.target.value });
          }}
          sx={{ minWidth: 120 }}
        >
          <MenuItem value="">Todos</MenuItem>
          <MenuItem value="true">Éxito</MenuItem>
          <MenuItem value="false">Fallo</MenuItem>
        </TextField>
      </Grid>
      <Grid size={{ xs: 12, md: 3 }}>
        <Button
          sx={{ width: { xs: "100%", md: "auto" } }}
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
