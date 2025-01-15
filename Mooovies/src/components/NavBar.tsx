import { useWishlist } from "../context/WishListContext";
import { Link } from "react-router";
import styles from "./../style/Navbar.module.css"; // Import du fichier CSS Module

const Navbar = () => {
  const { wishlist } = useWishlist();

  return (
    <nav className={styles.nav}>
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <Link to="/">Accueil</Link>
        </li>
        <li className={styles.navItem}>
          <Link to="/wishlist">Wishlist ({wishlist.length})</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
