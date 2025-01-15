import "./App.css";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import MoviesList from "./components/MoviesList";
import MoviesDetails from "./components/MoviesDetails";
import { WishlistProvider } from "./context/WishListContext";
import Wishlist from "./components/WishList";
import Navbar from "./components/NavBar";

function App() {
  return (
    <WishlistProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<MoviesList />} />
          <Route path="/movie/:movieId" element={<MoviesDetails />} />
          <Route path="/wishlist" element={<Wishlist />} />
        </Routes>
      </BrowserRouter>
    </WishlistProvider>
  );
}

export default App;
