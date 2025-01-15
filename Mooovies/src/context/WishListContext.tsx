import React, {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
} from "react";
import { Movies } from "../types/moovies.type";
import { Movie } from "../types/movie.type";

interface WishlistContextType {
  wishlist: Movies[];
  addToWishlist: (movie: Movie) => void;
  removeFromWishlist: (id: number) => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(
  undefined
);

interface WishlistProviderProps {
  children: ReactNode;
}

export const WishlistProvider = ({ children }: WishlistProviderProps) => {
  const [wishlist, setWishlist] = useState<Movies[]>([]);

  const addToWishlist = (movie: Movie) => {
    setWishlist((prevWishlist) => [...prevWishlist, movie]);
  };

  const removeFromWishlist = (id: number) => {
    setWishlist((prevWishlist) =>
      prevWishlist.filter((movie) => movie.id !== id)
    );
  };

  useEffect(() => {
    const wishlistFromStorage = localStorage.getItem("wishlist");
    if (wishlistFromStorage) {
      setWishlist(JSON.parse(wishlistFromStorage));
    }
  }, []);

  useEffect(() => {
    if (wishlist.length > 0) {
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
    }
  }, [wishlist]);

  return (
    <WishlistContext.Provider
      value={{ wishlist, addToWishlist, removeFromWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

// Hook personnalisé pour utiliser le contexte
export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};
