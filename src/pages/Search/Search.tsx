import { useState, useEffect } from "react";
import MovieModel from "../../models/MovieModel";
import SearchMovie from "../../components/Search/SearchMovie";
import Pagination from "../../components/Universal/Utils/Pagination";

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

  //Pagination realisation
  const [currentPage, setCurrentPage] = useState(1);
  const [moviesPerPage] = useState(3);
  // const [totalAmountOfMovies, setTotalAmountOfMovies] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  //
  useEffect(() => {
    const fetchMovies = async () => {
      const baseUrl: string = "http://localhost:8080/api/movie";
      const url: string = `${baseUrl}?page=${
        currentPage - 1
      }&size=${moviesPerPage}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const responseJson = await response.json();
      const responseData = responseJson.content;

      setTotalPages(responseJson.totalPages);
      // setTotalAmountOfMovies(responseJson.totalElements);

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
      console.log(loadedMovies);
    };
    fetchMovies().catch((error: any) => {
      console.log(error.message);
    });
    window.scrollTo(0, 0);
  }, [currentPage]);

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
                      <li key={movieGenres.indexOf(movieGenre)}>
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
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        paginate={handlePageChange}
      />
    </div>
  );
};

export default Search;
