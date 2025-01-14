import "./App.css";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import MoviesList from "./components/MoviesList";
import MoviesDetails from "./components/MoviesDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MoviesList />} />
        <Route path="/movie/:movieId" element={<MoviesDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
