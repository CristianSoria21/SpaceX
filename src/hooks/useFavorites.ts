import { useContext } from "react";
import { FavoritesContext } from "../context/FavoritesContext";

const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context)
    throw new Error("useFavorites no se esta usando en el lugar correcto ");
  return context;
};

export default useFavorites;
