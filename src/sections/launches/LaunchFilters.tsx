import { TextField, MenuItem } from "@mui/material";
import Grid from "@mui/material/Grid";
type Props = {
  onFilterChange: (filters: {
    year?: string;
    success?: string;
    rocketId?: string;
    search?: string;
  }) => void;
};

export const LaunchFilters = ({ onFilterChange }: Props) => {
  return (
    <Grid container spacing={2} mb={2}>
      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <TextField
          label="Buscar por nombre"
          variant="outlined"
          fullWidth
          onChange={(e) => onFilterChange({ search: e.target.value })}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <TextField
          label="Año"
          type="number"
          variant="outlined"
          fullWidth
          onChange={(e) => onFilterChange({ year: e.target.value })}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <TextField
          label="Resultado"
          select
          fullWidth
          defaultValue=""
          onChange={(e) => onFilterChange({ success: e.target.value })}
        >
          <MenuItem value="">Todos</MenuItem>
          <MenuItem value="true">Éxito</MenuItem>
          <MenuItem value="false">Fallo</MenuItem>
        </TextField>
      </Grid>
      {/* Más filtros como cohete se pueden añadir aquí */}
    </Grid>
  );
};
