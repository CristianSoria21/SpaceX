// hooks/useFilters.ts
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
