import { createContext, useEffect, useState, type ReactNode } from "react";
import type { Launch } from "../types";

// Definimos la clave que usaremos para guardar los datos en el localStorage
const LOCAL_STORAGE_KEY = "favoriteLaunches";

type FavoritesContextType = {
  favorites: Launch[];
  isFavorite: (id: string) => boolean;
  toggleFavorite: (launch: Launch) => void;
};

export const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

// Función que obtiene la lista inicial de favoritos desde localStorage
const getInitialFavorites = (): Launch[] => {
  try {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    const parsed = stored && JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

// Componente Provider que encapsula y proporciona acceso al contexto de favoritos
export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<Launch[]>(getInitialFavorites);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const isFavorite = (id: string) => favorites.some((fav) => fav.id === id);

  // Agrega o elimina un lanzamiento de la lista de favoritos
  const toggleFavorite = (launch: Launch) =>
    setFavorites((prev) =>
      prev.some((fav) => fav.id === launch.id)
        ? prev.filter((fav) => fav.id !== launch.id)
        : [...prev, launch]
    );

  // Proporcionamos el contexto a los componentes hijos
  return (
    <FavoritesContext.Provider
      value={{ favorites, isFavorite, toggleFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
