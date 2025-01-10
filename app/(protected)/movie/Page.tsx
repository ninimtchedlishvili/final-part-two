"use client";
import { Movie, MovieProps } from "@/app/(protected)/types/types";
import MovieCard from "../components/MovieCard/MovieCard";
import { useCallback, useState, useEffect } from "react";
import Pagination from "../components/pagination/Pagination";

const Movies = ({ movies }: MovieProps) => {
  const [showMovies, setShowMovies] = useState(movies);
  const [currentPage, setCurrentPage] = useState(showMovies?.page);
  const [sortType, setSortType] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  // Fetch movies based on page, sort type, and order
  const fetchMovies = async () => {
    try {
      const data = await fetch(
        `https://api.themoviedb.org/3/discover/movie?sort_by=${sortType}.${sortOrder}&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=${currentPage}`
      );
      const newMovies = await data.json();
      setShowMovies(newMovies);
    } catch (error) {
      console.log(error);
    }
  };

  // Handle page change (pagination)
  const handlePageChange = useCallback(
    (page: number) => {
      setCurrentPage(page);
    },
    []
  );

  // Handle sorting change
  const handleSort = (newSortType: string) => {
    setSortType(newSortType);
    setSortOrder("asc"); // Reset to ascending when changing the sort type
  };

  // Handle toggling sort order (ascending/descending)
  const toggleSortOrder = () => {
    const newOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newOrder);
  };

  const sortingData = [
    {
      name: "Title",
      value: "title",
    },
    {
      name: "Release Date",
      value: "release_date",
    },
    {
      name: "Vote Average",
      value: "vote_average",
    },
    {
      name: "Review Count",
      value: "vote_count",
    },
    {
      name: "Popularity",
      value: "popularity",
    },
  ];

  useEffect(() => {
    fetchMovies();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortType, sortOrder, currentPage]);

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

        {/* Filter and Sorting */}
        <div className="flex items-center space-x-4 mb-4">
          <select
            onChange={(e) => handleSort(e.target.value)}
            className="block w-1/5 rounded-lg border border-gray-300 bg-white py-2 px-3 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
          >
            {sortingData.map((data) => (
              <option key={data.value} value={data.value}>
                {data.name}
              </option>
            ))}
          </select>

          <button
            className="flex items-center text-white"
            onClick={toggleSortOrder}
          >
            {sortOrder === "desc" ? (
              <>
                <svg
                  className="h-5 w-5 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
                Descending
              </>
            ) : (
              <>
                <svg
                  className="h-5 w-5 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 15l7-7 7 7"
                  />
                </svg>
                Ascending
              </>
            )}
          </button>
        </div>

        {/* Movie Cards */}
        <div className="grid gap-4 mt-5 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-4">
          {showMovies.results.map((movie: Movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>

        {/* Pagination */}
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
