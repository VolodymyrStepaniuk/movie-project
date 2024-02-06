import Movie from "./Movie";
import "./Carousel.css";
import MovieModel from "../../../models/MovieModel";
import { useState, useEffect } from "react";
import SpinnerLoading from "../../Universal/Utils/SpinnerLoading";
import { BASE_URL } from "../../../constants/BASE_URL";

const Carousel = () => {
  //
  const [movies, setMovies] = useState<MovieModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const fetchMovies = async () => {
      const baseUrl: string = BASE_URL + "/movie";
      const url: string = `${baseUrl}?page=0&size=9`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const responseJson = await response.json();
      const responseData = responseJson.content;

      const loadedMovies: MovieModel[] = [];
      for (const key in responseData) {
        loadedMovies.push(
          new MovieModel(
            responseData[key].id,
            responseData[key].title,
            responseData[key].requiredAge,
            responseData[key].year,
            responseData[key].producingCountries,
            responseData[key].genres,
            responseData[key].directors,
            responseData[key].duration,
            responseData[key].language,
            responseData[key].description,
            responseData[key].trailerUrl,
            responseData[key].videoUrl,
            responseData[key].imageUrls
          )
        );
      }

      setMovies(loadedMovies);
      setIsLoading(false);
      console.log(loadedMovies);
    };
    fetchMovies().catch((error: any) => {
      setIsLoading(false);
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

  const moviesPerSlide =
  windowWidth < 768 ? 1 :
  windowWidth < 992 ? 3 : 4;

  const showCarouselControls = movies.length > 3;

  const handleNext = () => {
    setCurrentSlide((currentSlide + 1) % movies.length);
  };

  const handlePrev = () => {
    setCurrentSlide((currentSlide - 1 + movies.length) % movies.length);
  };

  if (isLoading) {
    return <SpinnerLoading />;
  }

  return (
    <div className="container-fluid mt-3 mb-3 bg-color-gray">
      <h1 className="fw-bold text-center text-white ">
        Новинки світового прокату:
      </h1>
      <div
        id="carouselExampleControls"
        className="carousel slide d-flex align-items-center"
        style={{ height: "100%" }}
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <div className="row d-flex justify-content-center align-items-center">
              {Array.from({ length: moviesPerSlide }).map((_, i) => {
                const movie = movies[(currentSlide + i) % movies.length];

                return <Movie movie={movie} key={movie.id} />;
              })}
            </div>
          </div>
          {showCarouselControls && (
            <>
              <button
                className="carousel-control-prev"
                type="button"
                onClick={handlePrev}
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
                onClick={handleNext}
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
