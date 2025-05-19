import axiosServices from "../config/axios";
import type { Launch, Launchpad } from "../types";

/**
 * Obtiene la lista de lanzamientos  
 * @returns {Promise<Launch[]>} - Promesa que resuelve con un arreglo de lanzamientos.*/
export const fetcherLaunches = async (): Promise<Launch[]> => {
  const res = await axiosServices.get(`/launches`);
  return res.data;
};

/**
 * Obtiene la lista de plataformas de lanzamiento  
 * @returns {Promise<Launchpad[]>} - Promesa que resuelve con un arreglo de plataformas de lanzamiento.*/
export const fetcherLaunchpads = async (): Promise<Launchpad[]> => {
  const res = await axiosServices.get(`/launchpads`);
  return res.data;
};

/**
 * Obtiene la lista de cohetes  
 * @returns {Promise<Launchpad[]>} - Promesa que resuelve con un arreglo de cohetes. */
export const fetcherRockets = async (): Promise<Launchpad[]> => {
  const res = await axiosServices.get(`/rockets`);
  return res.data;
};
