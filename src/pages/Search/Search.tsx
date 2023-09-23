import { useState, useEffect } from "react";
import MovieModel from "../../models/MovieModel";
import SearchMovie from "../../components/Search/SearchMovie";
import Pagination from "../../components/Universal/Utils/Pagination";
import CustomError from "../../components/Universal/Utils/CustomError";
import SpinnerLoading from "../../components/Universal/Utils/SpinnerLoading";

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
  const [httpError, setHttpError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  //Pagination realisation
  const moviesPerPage = 3;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalAmountOfMovies, setTotalAmountOfMovies] = useState(0);
  //Search by title
  const [search, setSearch] = useState("");
  const [searchUrl, setSearchUrl] = useState("");
  //Seacrh by genre
  const [genreSelection, setGenreSelection] = useState("Movie genre");
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  //
  useEffect(() => {
    const fetchMovies = async () => {
      const baseUrl: string = "http://localhost:8080/api/movie";
      const url =
        searchUrl === ""
          ? `${baseUrl}?page=${currentPage - 1}&size=${moviesPerPage}`
          : `${baseUrl}${searchUrl.replace(
              "<pageNumber>",
              `${currentPage - 1}`
            )}`;
      const response = await fetch(url);
      const responseJson = await response.json();
      if (!response.ok) {
        setHttpError(responseJson);
        throw new Error("Something went wrong!");
      }
      const responseData = responseJson.content;

      setTotalPages(responseJson.totalPages);
      setTotalAmountOfMovies(responseJson.totalElements);

      const loadedMovies: MovieModel[] = [];
      for (const key in responseData) {
        loadedMovies.push(
          new MovieModel(
            responseData[key].id,
            responseData[key].title,
            responseData[key].year,
            responseData[key].production,
            responseData[key].genres,
            responseData[key].director,
            responseData[key].duration,
            responseData[key].language,
            responseData[key].description,
            `${baseUrl}/${responseData[key].id}/image`
          )
        );
      }
      setMovies(loadedMovies);
      setIsLoading(false);
    };
    fetchMovies().catch((error: any) => {
      setIsLoading(false);
      console.log(error.message);
    });
    window.scrollTo(0, 0);
  }, [currentPage, searchUrl]);

  const searchHandleChange = () => {
    setCurrentPage(1);
    search === ""
      ? (setSearchUrl(""), setGenreSelection("ALL"))
      : setSearchUrl(
          `/title?title=${search}&page=<pageNumber>&size=${moviesPerPage}`
        );
  };

  const genreHandleChange = (genre: string) => {
    setGenreSelection(genre);
    setCurrentPage(1);
    if (genre !== "ALL") {
      const selectedGenreMovies = movieGenres.filter(
        (movieGenre) => movieGenre === genre
      );
      if (selectedGenreMovies.length > 0) {
        setSearchUrl(
          `/genre?genre=${genre}&page=<pageNumber>&size=${moviesPerPage}`
        );
      }
    } else {
      setSearchUrl(`?page=<pageNumber>&size=${moviesPerPage}`);
    }
  };

  if (isLoading) {
    return <SpinnerLoading />;
  }

  if (httpError) {
    return <CustomError error={httpError} />;
  }

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
                onChange={(e) => setSearch(e.target.value)}
              />
              <button
                className="btn btn-outline-success"
                onClick={() => {
                  searchHandleChange();
                }}
              >
                Search
              </button>
              <div className="mx-2 d-none d-lg-block">
                <div className="dropdown justify-content-center">
                  <button
                    className="btn btn-secondary dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {genreSelection}
                  </button>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButton1"
                  >
                    {movieGenres.map((movieGenre) => (
                      <li
                        key={movieGenres.indexOf(movieGenre)}
                        onClick={() => {
                          genreHandleChange(movieGenre);
                        }}
                      >
                        <a className="dropdown-item" href="#">
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
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        paginate={handlePageChange}
      />
    </div>
  );
};

export default Search;
