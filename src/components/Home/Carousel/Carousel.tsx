import Movie from "./Movie";
import "./Carousel.css";
import MovieModel from "../../../models/MovieModel";
import { useState, useEffect } from "react";

const Carousel = () => {
  //
  const [movies, setMovies] = useState<MovieModel[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const baseUrl: string = "http://localhost:8080/api/movie";
      const url: string = `${baseUrl}/page?page=0&size=9`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const responseJson = await response.json();

      const loadedMovies: MovieModel[] = [];
      for (const key in responseJson) {
        loadedMovies.push(
          new MovieModel(
            responseJson[key].id,
            responseJson[key].title,
            responseJson[key].year,
            responseJson[key].production,
            responseJson[key].genres,
            responseJson[key].director,
            responseJson[key].duration,
            responseJson[key].language,
            responseJson[key].description,
            `${baseUrl}/${responseJson[key].id}/image`
          )
        );
      }
      setMovies(loadedMovies);
      console.log(loadedMovies);
    };
    fetchMovies().catch((error: any) => {
      console.log(error.message);
    });
  }, []);

  // Resize carousel component
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const moviesPerSlide = windowWidth < 768 ? 1 : 4; // 1 movie on small screens, 3 on larger screens

  return (
    <div className="container-fluid mt-5" style={{ height: 500 }}>
      <div
        id="carouselExampleControls"
        className="carousel slide d-flex align-items-center"
        style={{ height: "100%" }}
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <div className="row d-flex justify-content-center align-items-center">
              {movies.slice(0, 1).map((movie) => (
                <Movie movie={movie} key={movie.id} />
              ))}
              {movies
                .slice(1, 3)
                .map(
                  (movie) =>
                    moviesPerSlide > 1 && <Movie movie={movie} key={movie.id} />
                )}
            </div>
          </div>
          <div className="carousel-item">
            <div className="row d-flex justify-content-center align-items-center">
              {movies.slice(3, 4).map((movie) => (
                <Movie movie={movie} key={movie.id} />
              ))}
              {movies
                .slice(4, 6)
                .map(
                  (movie) =>
                    moviesPerSlide > 1 && <Movie movie={movie} key={movie.id} />
                )}
            </div>
          </div>
          <div className="carousel-item">
            <div className="row d-flex justify-content-center align-items-center">
              {movies.slice(6, 7).map((movie) => (
                <Movie movie={movie} key={movie.id} />
              ))}
              {movies
                .slice(7, 9)
                .map(
                  (movie) =>
                    moviesPerSlide > 1 && <Movie movie={movie} key={movie.id} />
                )}
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
