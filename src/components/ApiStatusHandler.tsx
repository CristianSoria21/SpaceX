import { Box, CircularProgress, Typography } from "@mui/material";
import { SatelliteAlt } from "@mui/icons-material";
import type { AxiosError } from "axios";

type Props = {
  isLoading: boolean;
  error: AxiosError;
  minHeight?: number;
  children: React.ReactNode;
  api: string;
};

export const ApiStatusHandler = ({
  isLoading,
  error,
  minHeight = 400,
  children,
  api,
}: Props) => {
  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight={minHeight}
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
        minHeight={minHeight}
        p={3}
      >
        <SatelliteAlt color="error" sx={{ fontSize: 60, mb: 2 }} />
        <Typography variant="h4" color="error" align="center" gutterBottom>
          {`Error al cargar los datos de la api "${api}""`}
        </Typography>
        <Typography variant="h6" color="text.secondary" align="center">
          No se pudo completar la carga. Intenta recargando la página.
        </Typography>
        <Typography variant="h6" color="text.secondary" align="center">
          {error + ""}
        </Typography>
      </Box>
    );
  }

  return <>{children}</>;
};
