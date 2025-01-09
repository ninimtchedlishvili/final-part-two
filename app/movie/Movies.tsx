"use client";
import { Movie, MovieProps } from "@/types/types";
import MovieCard from "../components/MovieCard/MovieCard";
import { useCallback, useState, useEffect } from "react";
import Pagination from "../components/pagination/Pagination";

const Movies = ({ movies }: MovieProps) => {
  const [showMovies, setShowMovies] = useState(movies);
  const [currentPage, setCurrentPage] = useState(showMovies?.page);

  useEffect(() => {
    const fetchMoviesByPage = async () => {
      try {
        const data = await fetch(
          `https://api.themoviedb.org/3/discover/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=${currentPage}`
        );
        const newMovies = await data.json();
        setShowMovies(newMovies);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMoviesByPage();
  }, [currentPage]);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  return (
    <div className="bg-gray-50 py-8 antialiased dark:bg-gray-900 md:py-12">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <div className="mb-4 items-end justify-between space-y-4 sm:flex sm:space-y-0 md:mb-8">
          <div>
            <nav className="flex" aria-label="Breadcrumb">
              <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                <li className="inline-flex items-center">
                  <a
                    href="#"
                    className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-primary-600 dark:text-gray-400 dark:hover:text-white"
                  >
                    <svg
                      className="me-2.5 h-3 w-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                    </svg>
                    Home
                  </a>
                </li>
              </ol>
            </nav>
            <h2 className="mt-3 text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
              Movies
            </h2>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-4">
          {showMovies.results.map((movie: Movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>

        <div className="w-full text-center mt-5">
          <Pagination
            onPageChange={handlePageChange}
            currentPage={currentPage}
            totalPages={500}
          />
        </div>
      </div>
    </div>
  );
};

export default Movies;
