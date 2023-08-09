import MovieModel from "../../../models/MovieModel";

const Movie: React.FC<{ movie: MovieModel }> = (props) => {
  return (
    <div className="col-xs-6 col-sm-6 col-md-4 col-lg-3 mb-3">
      <div className="text-center">
        <a href={"/movie/" + `${props.movie.id}`}>
          {props.movie.imgUrl ? (
            <img
              src={props.movie.imgUrl}
              width="201"
              height="303"
              alt="movie"
            />
          ) : (
            <img
              src={
                "https://multiplex.ua/images/5a/96/5a96718752c26e05fb7549758a57171b.jpeg"
              }
              width="201"
              height="303"
              alt="movie"
            />
          )}
        </a>
      </div>
    </div>
  );
};

export default Movie;
