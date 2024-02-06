import { useEffect, useState } from "react";
import CustomError from "../Universal/Utils/CustomError";
import SpinnerLoading from "../Universal/Utils/SpinnerLoading";
import { BASE_URL } from "../../constants/BASE_URL";
import { parseDuration } from "../../constants/DurationParser";
import Video from "../Universal/Video/Video";
import StarReview from "../Universal/Star/StarReview";
import Movie from "../../models/MovieModel";
import Reviews from "../Review/Reviews";
import CheckoutAndReview from "../Review/CheckoutAndReviewBox";

const MovieCheckout = () => {
  const [movie, setMovie] = useState<Movie>();
  const [httpError, setHttpError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const movieId = window.location.pathname.split("/")[2];
  let isUserAuthenticated = true;

  useEffect(() => {
    const fetchMovie = async () => {
      const baseUrl = BASE_URL + "/movie";
      const url = `${baseUrl}/${movieId}`;
      const response = await fetch(url);

      const responseJson = await response.json();
      if (!response.ok) {
        setHttpError(responseJson);
        throw new Error("Something went wrong!");
      }

      const jsonDuration = parseDuration(responseJson.duration);
      const duration = {
        hours: Math.floor(jsonDuration / 60),
        minutes: jsonDuration % 60,
      };

      const loadedMovie: Movie = new Movie(
        responseJson.id,
        responseJson.title,
        responseJson.requiredAge,
        responseJson.year,
        responseJson.producingCountries,
        responseJson.genres,
        responseJson.directors,
        duration.hours + " год. " + duration.minutes + " хв.",
        responseJson.language,
        responseJson.description,
        responseJson.trailerUrl,
        responseJson.videoUrl,
        responseJson.imageUrls
      );

      setMovie(loadedMovie);
      setIsLoading(false);
      localStorage.setItem("movieId", movieId);
    };
    fetchMovie().catch((error: any) => {
      setIsLoading(false);
      console.log(error.message);
    });
  }, []);

  if (httpError) {
    return <CustomError error={httpError} />;
  }

  if (isLoading) {
    return <SpinnerLoading />;
  }

  return (
    <div>
      <div className="container p-0 d-none d-lg-block">
        <div className="row mt-5">
          <div className="col-sm-2 col-md-2 mx-5 d-flex flex-column align-items-center text-center">
            {movie?.imageUrls[0] ? (
              <img
                src={movie?.imageUrls[0]}
                alt={movie?.title}
                className="rounded"
              />
            ) : (
              <img
                src="https://via.placeholder.com/250x350"
                alt="movie poster"
                className="rounded"
              />
            )}

            {movie?.trailerUrl && (
              <a
                href={movie?.trailerUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <button
                  type="button"
                  className="btn btn-dark mt-3 fw-bold mx-auto"
                >
                  Дивитись трейлер
                </button>
              </a>
            )}
          </div>
          <div className="col-4 col-md-6 mx-5 text-white">
            <div className="ml-2 w-100">
              <h2 className="fw-bold">{movie?.title}</h2>
              <ul className="list-unstyled">
                <li className="d-flex mb-2">
                  <p className="me-2 fw-bold">Вік:</p>
                  <p>{movie?.requiredAge + "+"}</p>
                </li>
                <li className="d-flex mb-2">
                  <p className="me-2 fw-bold">Рік:</p>
                  <p>{movie?.year}</p>
                </li>
                <li className="d-flex mb-2">
                  <p className="me-2 fw-bold">Режисер:</p>
                  <p>
                    {movie?.directors
                      ?.map(
                        (director) =>
                          `${director.firstName} ${director.lastName}`
                      )
                      .join(", ")}
                  </p>
                </li>
                <li className="d-flex mb-2">
                  <p className="me-2 fw-bold">Мова:</p>
                  <p>{movie?.language}</p>
                </li>
                <li className="d-flex mb-2">
                  <p className="me-2 fw-bold">Жанр:</p>
                  <div>
                    {movie?.genres?.map((genre, index) => (
                      <span key={index}>
                        {index > 0 && ", "}
                        {genre.genreName}
                      </span>
                    ))}
                  </div>
                </li>
                <li className="d-flex mb-2">
                  <p className="me-2 fw-bold">Тривалість:</p>
                  <p>{movie?.duration}</p>
                </li>
                <li className="d-flex">
                  <p className="me-2 fw-bold">Виробництво:</p>
                  <p>
                    {movie?.producingCountries
                      ?.map((country) => country.name)
                      .join(", ")}
                  </p>
                </li>
                <li className="d-flex">
                  <p className="me-2 fw-bold">Рейтинг:</p>
                  <p>
                  <StarReview rating={5} size={16} />
                  </p>
                </li>
              </ul>

              <p className=""> {movie?.description}</p>
            </div>
          </div>
        </div>
        <hr />
      </div>

      <div className="container p-0 d-lg-none mt-5">
        <div className="d-flex justify-content-center aligh-items-center">
          {movie?.trailerUrl ? (
            <Video videoUrl={movie?.trailerUrl} />
          ) : (
            <img
              src={movie?.imageUrls[0]}
              alt={movie?.title}
              className="rounded"
            />
          )}
        </div>
        <div className="mt-4">
          <div className="ml-2 text-white text-center">
            <h2>{movie?.title}</h2>
            <p>
              <StarReview rating={4} size={16} />
            </p>
            <h5 className="text-primary">
              {" "}
              {movie?.producingCountries
                ?.map((country) => country.name)
                .join(", ")}
            </h5>
            <p className="lead"> {movie?.description}</p>
          </div>
        </div>
        <hr />
      </div>

      {isUserAuthenticated && movie?.videoUrl && (
        <Video videoUrl={movie?.videoUrl} />
      )}
      <CheckoutAndReview />
      <Reviews movieId={movieId} />
    </div>
  );
};

export default MovieCheckout;
