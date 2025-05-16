import { useEffect, useState } from "react";
import type { Launch } from "../types";

const FAVORITES_KEY = "favorites";

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<Launch[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(FAVORITES_KEY);
    if (stored) setFavorites(JSON.parse(stored));
  }, []);

  const addFavorite = (launch: Launch) => {
    const updated = [...favorites, launch];
    setFavorites(updated);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
  };

  const removeFavorite = (id: string) => {
    const updated = favorites.filter((launch) => launch.id !== id);
    setFavorites(updated);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
  };

  const isFavorite = (id: string) => {
    return favorites.some((launch) => launch.id === id);
  };

  return { favorites, addFavorite, removeFavorite, isFavorite };
};
