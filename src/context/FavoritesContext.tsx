import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { Launch } from "../types";

const LOCAL_STORAGE_KEY = "favoriteLaunches";

type FavoritesContextType = {
  favorites: Launch[];
  isFavorite: (id: string) => boolean;
  toggleFavorite: (launch: Launch) => void;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

const getInitialFavorites = (): Launch[] => {
  try {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    const parsed = stored && JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<Launch[]>(getInitialFavorites);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const isFavorite = (id: string) => favorites.some((fav) => fav.id === id);

  const toggleFavorite = (launch: Launch) =>
    setFavorites((prev) =>
      prev.some((fav) => fav.id === launch.id)
        ? prev.filter((fav) => fav.id !== launch.id)
        : [...prev, launch]
    );

  return (
    <FavoritesContext.Provider
      value={{ favorites, isFavorite, toggleFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context)
    throw new Error("useFavorites no se esta usando en el lugar correcto ");
  return context;
};
