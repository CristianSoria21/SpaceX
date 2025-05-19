/**
 * Este hook filtra una lista de lanzamientos en base a los filtros aplicados (búsqueda por nombre,
 * año, éxito del lanzamiento y tipo de cohete). Devuelve solo los resultados que cumplen con todos
 * los criterios activos.
 * @param launches Lista completa de lanzamientos.
 * @param rockets Lista de cohetes disponibles (puede ser undefined si aún no se ha cargado).
 * @param filters Objeto con los filtros seleccionados por el usuario.
 */
import { useMemo } from "react";
import type { Rocket, Launch, Filters } from "../types";

export const useFilters = (
  launches: Launch[],
  rockets: Rocket[] | undefined,
  filters: Filters
) => {
  return useMemo(() => {
    return launches.filter((launch) => {
      const matchesSearch =
        !filters.search ||
        launch.name.toLowerCase().includes(filters.search.toLowerCase());

      const matchesYear =
        !filters.year ||
        new Date(launch.date_utc).getFullYear().toString() === filters.year;

      const matchesSuccess =
        filters.success === "" ||
        launch.success === (filters.success === "true");

      const rocketUsed = rockets?.find((r) => r.id === launch.rocket);
      const matchesRocket =
        !filters.rocket || rocketUsed?.name === filters.rocket;

      return matchesSearch && matchesYear && matchesSuccess && matchesRocket;
    });
  }, [launches, filters, rockets]);
};
