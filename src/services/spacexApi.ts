// api.ts
import axiosServices from "../config/axios";
import type { Launch, Rocket, Launchpad } from "../types";

// Fetchers individuales para usar con SWR
export const fetcherLaunches = async (): Promise<Launch[]> => {
  const res = await axiosServices.get(`/launches`);
  return res.data;
};

export const fetcherRockets = async (): Promise<Rocket[]> => {
  const res = await axiosServices.get(`/rockets`);
  return res.data;
};

export const fetcherLaunchpads = async (): Promise<Launchpad[]> => {
  const res = await axiosServices.get(`/launchpads`);
  return res.data;
};
