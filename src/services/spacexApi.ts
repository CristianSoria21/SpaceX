import axiosServices from "../config/axios";
import type { Launch, Launchpad } from "../types";

export const fetcherLaunches = async (): Promise<Launch[]> => {
  const res = await axiosServices.get(`/launches`);
  return res.data;
};

export const fetcherLaunchpads = async (): Promise<Launchpad[]> => {
  const res = await axiosServices.get(`/launchpads`);
  return res.data;
};
