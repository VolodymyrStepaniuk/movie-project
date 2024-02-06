import React from "react";
import MovieModel from "../../models/MovieModel";
import "./SearchMovie.css";

const MAX_DESCRIPTION_LENGTH = 275;

const SearchMovie: React.FC<{ movie: MovieModel }> = (props) => {
  const trimmedDescription =
    props.movie.description.length > MAX_DESCRIPTION_LENGTH
      ? props.movie.description.substring(0, MAX_DESCRIPTION_LENGTH) + "..."
      : props.movie.description;
  const movie = props.movie;
  const movieImages = movie.imageUrls;
  
  return (
    <div className="">
      <div className="card bg-dark text-white w-75 mb-3 mx-auto">
        <div className="row g-0">
          <div className="col-md-3">
            {movieImages ? (
              <img
                className="card-img h-100"
                src={movieImages[0]}
                alt="movie"
              />
            ) : (
              <img
                className="card-img h-100"
                src="https://multiplex.ua/images/5a/96/5a96718752c26e05fb7549758a57171b.jpeg"
                alt="movie"
              />
            )}
          </div>
          <div className="col-md-9 rounded-end bg-grey">
            <div className="card-body d-flex flex-column justify-content-center align-items-center">
              <h3 className="card-title fw-bold text-white mt-3">
                {props.movie.title}
              </h3>
              <p
                className="card-text text-gray mt-3 request-text fs-6 text-center"
                style={{ marginBottom: "20px" }}
              >
                {trimmedDescription}
              </p>
              <div className="d-flex justify-content-end align-items-end">
                <a
                  href={`/movie/${props.movie.id}`}
                  className="fw-bold text-center text-reset text-decoration-none mb-4 me-4"
                >
                  View more
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchMovie;
