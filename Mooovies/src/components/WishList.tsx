import React from "react";
import { useWishlist } from "../context/WishListContext";
import styles from "./../style/Wishlist.module.css";

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useWishlist();

  return (
    <div className={styles.container}>
      <h1>Ma Wishlist</h1>
      {wishlist.length === 0 ? (
        <p className={styles.emptyMessage}>Votre wishlist est vide.</p>
      ) : (
        <ul>
          {wishlist.map((movie) => (
            <li key={movie.id} className={styles.movieItem}>
              {movie.title} - {movie.release_date.slice(0, 4)}
              <button
                className={styles.button}
                onClick={() => removeFromWishlist(movie.id)}
              >
                Supprimer
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Wishlist;
