import "./App.css";

import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Registration from "./pages/Registration/Registration";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Search from "./pages/Search/Search";
import Footer from "./components/Universal/Footer/Footer";
import Line from "./components/Universal/Line/Line";
import Navbar from "./components/Universal/Navbar/Navbar";
import MoviePage from "./pages/Movie/MoviePage";


function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/movie/:movieId" element={<MoviePage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Line />
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
