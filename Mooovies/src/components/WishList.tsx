import { Link } from "react-router";
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
        <div className={styles.wishlistContainer}>
          {wishlist.map((movie) => (
            <div key={movie.id} className={styles.movieItem}>
              <Link to={`/movie/${movie.id}`}>
                {" "}
                <img
                  className={styles.poster}
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                />
                {movie.title}
              </Link>
              <p className={styles.date}>{movie.release_date.slice(0, 4)}</p>
              <button
                className={styles.button}
                onClick={() => removeFromWishlist(movie.id)}
              >
                Supprimer
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
