import { useEffect, useState } from "react";
import MovieModel from "../../models/MovieModel";
import CustomError from "../Universal/Utils/CustomError";
import SpinnerLoading from "../Universal/Utils/SpinnerLoading";
const MovieCheckout = () => {
  const [movie, setMovie] = useState<MovieModel>();
  const [httpError, setHttpError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const movieId = window.location.pathname.split("/")[2];

  useEffect(() => {
    const fetchMovie = async () => {
      const baseUrl = "http://localhost:8080/api/movie";
      const url = `${baseUrl}/${movieId}`;
      const response = await fetch(url);

      const responseJson = await response.json();
      if (!response.ok) {
        setHttpError(responseJson);
        throw new Error("Something went wrong!");
      }
      const loadedMovie: MovieModel = new MovieModel(
        responseJson.id,
        responseJson.title,
        responseJson.year,
        responseJson.production,
        responseJson.genres,
        responseJson.director,
        responseJson.duration,
        responseJson.language,
        responseJson.description,
        `${baseUrl}/${responseJson.id}/image`
      );

      setMovie(loadedMovie);
      setIsLoading(false);
      console.log(loadedMovie);
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
          <div className="col-sm-2 col-md-2 mx-5">
            {movie?.imgUrl ? (
              <img
                src={movie?.imgUrl}
                alt={movie?.title}
                className="rounded position-fixed"
              />
            ) : (
              <img
                src="https://via.placeholder.com/250x350"
                alt="movie poster"
                className="rounded"
              />
            )}
          </div>
          <div className="col-4 col-md-4 mx-5 text-white">
            <div className="ml-2 w-100">
              <h2 className="fw-bold">{movie?.title}</h2>
              <ul className="list-unstyled">
                <li className="d-flex mb-2">
                  <p className="me-2 fw-bold">Рік:</p>
                  <p>{movie?.year}</p>
                </li>
                <li className="d-flex mb-2">
                  <p className="me-2 fw-bold">Режисер:</p>
                  <p>{movie?.director}</p>
                </li>
                <li className="d-flex mb-2">
                  <p className="me-2 fw-bold">Мова:</p>
                  <p>{movie?.language}</p>
                </li>
                <li className="d-flex mb-2">
                  <p className="me-2 fw-bold">Жанр:</p>
                  <div>
                    {movie?.genres.map((genre, index) => (
                      <span key={index}>
                        {index > 0 && ","}
                        {genre}
                      </span>
                    ))}
                  </div>
                </li>
                <li className="d-flex mb-2">
                  <p className="me-2 fw-bold">Тривалість:</p>
                  <p>{movie?.duration} min</p>
                </li>
                <li className="d-flex">
                  <p className="me-2 fw-bold">Виробництво:</p>
                  <p>{movie?.production}</p>
                </li>
              </ul>

              <p className="lead"> {movie?.description}</p>
            </div>
          </div>
        </div>
        <hr />
      </div>
      <div className="container p-0 d-lg-none mt-5">
        <div className="d-flex justify-content-center aligh-items-center">
          {movie?.imgUrl ? (
            <img src={movie?.imgUrl} alt={movie?.title} className="rounded" />
          ) : (
            <img
              src="https://via.placeholder.com/250x350"
              alt="movie poster"
              className="rounded"
            />
          )}
        </div>
        <div className="mt-4">
          <div className="ml-2 text-white text-center">
            <h2>{movie?.title}</h2>
            <h5 className="text-primary"> {movie?.production}</h5>
            <p className="lead"> {movie?.description}</p>
          </div>
        </div>
        <hr />
      </div>
    </div>
  );
};

export default MovieCheckout;
