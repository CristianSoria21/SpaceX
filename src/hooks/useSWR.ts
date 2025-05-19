/**
 * Este archivo define  hooks personalizados que utilizan SWR para obtener datos desde la API de SpaceX:
 */
import {
  fetcherLaunches,
  fetcherLaunchpads,
  fetcherRockets,
} from "../services/spacexApi";
import useSWR from "swr";

/**
 * Hook para obtener los lanzamientos.
 * @returns { launches, isLoading, error }
 */
export const useGetLaunches = () => {
  const {
    data: launches,
    isLoading,
    error,
  } = useSWR("launches", fetcherLaunches, {
    revalidateOnFocus: false,
    refreshInterval: 0,
  });

  return { launches, isLoading, error };
};

/**
 * Hook para obtener las plataformas de lanzamiento.
 * @returns { launchpads, isLoading, error }
 */
export const useGetLaunchpads = () => {
  const {
    data: launchpads,
    isLoading,
    error,
  } = useSWR("launchpad", fetcherLaunchpads, {
    revalidateOnFocus: false,
    refreshInterval: 0,
  });

  return { launchpads, isLoading, error };
};

/**
 * Hook para obtener los cohetes.
 * @returns { rockets, isLoading, error }
 */
export const useGetRockets = () => {
  const {
    data: rockets,
    isLoading,
    error,
  } = useSWR("rockets", fetcherRockets, {
    revalidateOnFocus: false,
    refreshInterval: 0,
  });

  return { rockets, isLoading, error };
};
