import { useState, useEffect } from "react";
import GenreModel from "../../models/GenreModel";
import SearchMovie from "../../components/Search/SearchMovie";
import Pagination from "../../components/Universal/Utils/Pagination";
import CustomError from "../../components/Universal/Utils/CustomError";
import SpinnerLoading from "../../components/Universal/Utils/SpinnerLoading";
import { BASE_URL } from "../../constants/BASE_URL";
import Movie from "../../models/MovieModel";

const Search = () => {
  const [movieGenres, setMovieGenres] = useState<GenreModel[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);

  const [movies, setMovies] = useState<Movie[]>([]);
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
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  //
  useEffect(() => {
    const fetchMovies = async () => {
      const baseUrl: string = BASE_URL + "/movie";
      const url =
        searchUrl === ""
          ? `${baseUrl}?page=${currentPage - 1}&size=${moviesPerPage}`
          : `${baseUrl}${searchUrl.replace(
              "<pageNumber>",
              `${currentPage - 1}`
            )}`;
      console.log(url);
      const response = await fetch(url);
      const responseJson = await response.json();
      if (!response.ok) {
        setHttpError(responseJson);
        throw new Error("Something went wrong!");
      }
      const responseData = responseJson.content;

      setTotalPages(responseJson.totalPages);
      setTotalAmountOfMovies(responseJson.totalElements);

      const loadedMovies: Movie[] = [];
      for (const key in responseData) {
        loadedMovies.push(
          new Movie(
            responseData[key].id,
            responseData[key].title,
            responseData[key].requiredAge,
            responseData[key].year,
            responseData[key].production,
            responseData[key].genres,
            responseData[key].director,
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
    };
    fetchMovies().catch((error: any) => {
      setIsLoading(false);
      console.log(error.message);
    });
    window.scrollTo(0, 0);
  }, [currentPage, searchUrl]);

  useEffect(() => {
    const fetchGenres = async () => {
      const response = await fetch(BASE_URL + "/genre?sort=id");
      const responseJson = await response.json();
      if (!response.ok) {
        setHttpError(responseJson);
        throw new Error("Something went wrong!");
      }
      const responseData = responseJson.content;

      const loadedGenres: GenreModel[] = [];
      for (const key in responseData) {
        loadedGenres.push(
          new GenreModel(responseData[key].id, responseData[key].genreName)
        );
      }
      setMovieGenres(loadedGenres);
    };
    fetchGenres().catch((error: any) => {
      setIsLoading(false);
      console.log(error.message);
    });
  }, []);

  const searchHandleChange = () => {
    setCurrentPage(1);
    search === ""
      ? setSearchUrl("")
      : setSearchUrl(
          `?title=${search}&page=<pageNumber>&size=${moviesPerPage}`
        );
  };

  const handleGenreChange = (genreId: number) => {
    const updatedGenres = selectedGenres.includes(genreId)
      ? selectedGenres.filter((id) => id !== genreId)
      : [...selectedGenres, genreId];

    setSelectedGenres(updatedGenres);
    setCurrentPage(1);

    const genreIdsString = updatedGenres.join(",");
    setSearchUrl(
      genreIdsString
        ? `?genreIds=${genreIdsString}&page=<pageNumber>&size=${moviesPerPage}`
        : ""
    );
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
                placeholder="Введіть назву фільму"
                aria-labelledby="Search"
                onChange={(e) => setSearch(e.target.value)}
              />
              <button
                className="btn btn-outline-success"
                onClick={searchHandleChange}
              >
                Пошук
              </button>
              <button
                className="btn btn-outline-primary ms-2"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#staticBackdrop"
                aria-controls="staticBackdrop"
              >
                Жанри
              </button>
            </div>
          </div>
        </div>

        <div
          className="offcanvas offcanvas-start"
          data-bs-backdrop="static"
          id="staticBackdrop"
          aria-labelledby="staticBackdropLabel"
          style={{backgroundColor: "#221f1f"}}
        >
          <div className="offcanvas-header d-flex justify-content-end">
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body">
          <div>
          <h5 className="fw-bold text-white text-center" id="staticBackdropLabel">
              Список жанрів
            </h5>
            <div className="d-flex flex-column align-items-start">
              {movieGenres.map((genre) => (
                <div key={genre.id} className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={`genre-${genre.id}`}
                    checked={selectedGenres.includes(genre.id)}
                    onChange={() => handleGenreChange(genre.id)}
                  />
                  <label
                    className="form-check-label text-white"
                    htmlFor={`genre-${genre.id}`}
                  >
                    {genre.genreName}
                  </label>
                </div>
              ))}
            </div>
          </div>
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-md-12">
            {movies.map((movie) => (
              <SearchMovie movie={movie} key={movie.id} />
            ))}
          </div>
        </div>
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
