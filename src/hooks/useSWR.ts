import { fetcherLaunches, fetcherLaunchpads } from "../services/spacexApi";
import useSWR from "swr";

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
