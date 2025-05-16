import axiosServices from "../config/axios";
import type { Launch, Rocket, Launchpad } from "../types";

export const fetchLaunches = async (): Promise<Launch[]> => {
  const res = await axiosServices.get(`/launches`);
  return res.data;
};

export const fetchRockets = async (): Promise<Rocket[]> => {
  const res = await axiosServices.get(`/rockets`);
  return res.data;
};

export const fetchLaunchpads = async (): Promise<Launchpad[]> => {
  const res = await axiosServices.get(`/launchpads`);
  return res.data;
};
