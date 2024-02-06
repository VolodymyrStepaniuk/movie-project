import MovieModel from "../../../models/MovieModel";

const Movie: React.FC<{ movie: MovieModel }> = (props) => {
  const movie = props.movie;
  const movieImages = movie.imageUrls;

  return (
    <div className="col-xs-6 col-sm-6 col-md-4 col-lg-2 mb-3">
      <div className="text-center">
        <a href={"/movie/" + `${movie.id}`}>
          {movieImages[0] ? (
            <img
              src={movieImages[0]}
              width="171"
              height="263"
              alt="movie"
            />
          ) : (
            <img
              src={
                "https://multiplex.ua/images/5a/96/5a96718752c26e05fb7549758a57171b.jpeg"
              }
              width="301"
              height="403"
              alt="movie"
            />
          )}
        </a>
      </div>
    </div>
  );
};

export default Movie;
