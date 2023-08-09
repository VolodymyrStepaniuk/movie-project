import { useState, useEffect } from "react";
import MovieModel from "../../models/MovieModel";
import SearchMovie from "../../components/Search/SearchMovie";

const Search = () => {
  const movieGenres: string[] = [
    "ALL",
    "COMEDY",
    "FANTASY",
    "HORRORS",
    "ACTION_FILM",
    "MELODRAMA",
    "ADVENTURES",
    "MYSTICISM",
    "DETECTIVE",
    "ANIMATION",
  ];
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
  return (
    <div className="container">
      <div>
        <div className="row mt-5 justify-content-center">
          <div className="col-8">
            <div className="d-flex justify-content-center">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-labelledby="Search"
              />
              <button className="btn btn-outline-success">Search</button>
              <div className="mx-2 d-none d-lg-block">
                <div className="dropdown justify-content-center">
                  <button
                    className="btn btn-secondary dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Category
                  </button>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButton1"
                  >
                    {movieGenres.map((movieGenre) => (
                      <li>
                        <a className="dropdown-item" href="/">
                          {movieGenre}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-3"></div>
        {movies.map((movie) => (
          <SearchMovie movie={movie} key={movie.id} />
        ))}
      </div>
    </div>
  );
};

export default Search;
