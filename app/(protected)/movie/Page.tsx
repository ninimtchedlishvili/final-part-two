"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import MovieCard from "../components/MovieCard/MovieCard";
import Pagination from "../components/pagination/Pagination";
import { Movie } from "@/app/(protected)/types/types";

const Movies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [sortType, setSortType] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [totalPages, setTotalPages] = useState(1);

  const router = useRouter();
  const searchParams = useSearchParams();

  const fetchMovies = async (query = "", page = 1, field = "title", order = "asc") => {
    try {
      const baseUrl = query
        ? `https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=${page}&query=${query}`
        : `https://api.themoviedb.org/3/discover/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=${page}`;

      const sortParams = field ? `&sort_by=${field}.${order}` : "";
      const response = await fetch(baseUrl + sortParams);
      const data = await response.json();

      setMovies(data.results || []);
      setTotalPages(data.total_pages || 1);
    } catch (error) {
      console.error("Failed to fetch movies:", error);
    }
  };

  const handleSearch = () => {
    if (searchValue.trim()) {
      router.push(`/?search=${searchValue}`);
      setCurrentPage(1); // Reset to the first page on new search
      fetchMovies(searchValue, 1, sortType, sortOrder);
    }
  };

  const handleClear = () => {
    setSearchValue("");
    router.push("/");
    setCurrentPage(1);
    fetchMovies("", 1, sortType, sortOrder);
  };

  const handlePageChange = useCallback(
    (page: number) => {
      setCurrentPage(page);
      fetchMovies(searchValue, page, sortType, sortOrder);
    },
    [searchValue, sortType, sortOrder]
  );

  const handleSort = (newSortType: string) => {
    setSortType(newSortType);
    setSortOrder("asc");
    fetchMovies(searchValue, currentPage, newSortType, "asc");
  };

  const toggleSortOrder = () => {
    const newOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newOrder);
    fetchMovies(searchValue, currentPage, sortType, newOrder); 
  };

  useEffect(() => {
    const query = searchParams.get("search") || "";
    setSearchValue(query);
    fetchMovies(query, currentPage, sortType, sortOrder); 
  }, [searchParams, currentPage, sortType, sortOrder]);

  const sortingData = [
    { name: "Title", value: "title" },
    { name: "Release Date", value: "release_date" },
    { name: "Vote Average", value: "vote_average" },
    { name: "Review Count", value: "vote_count" },
    { name: "Popularity", value: "popularity" },
  ];

  return (
    <div className="bg-gray-50 py-8 antialiased dark:bg-gray-900 md:py-12">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <header className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Movies</h1>
        </header>

        {/* Search and Sort Bar */}
        <div className="mb-6 flex flex-wrap items-center gap-4">
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search for movies..."
            className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-900 placeholder-gray-500 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
          />
          <button
            onClick={handleSearch}
            disabled={!searchValue.trim()}
            className={`rounded-lg px-4 py-2 text-sm font-medium text-white shadow ${
              searchValue.trim()
                ? "bg-blue-500 hover:bg-blue-600 focus:ring-blue-500"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Search
          </button>
          <button
            onClick={handleClear}
            className="rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white shadow hover:bg-red-600 focus:ring focus:ring-red-500"
          >
            Clear
          </button>
          <div className="flex items-center space-x-4 ">
            <select
              onChange={(e) => handleSort(e.target.value)}
              className="block  rounded-lg border border-gray-300 bg-white py-2 px-3 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
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
        </div>

        {/* Movie Cards */}
        <div className="grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-4">
          {movies.length > 0 ? (
            movies.map((movie) => <MovieCard movie={movie} key={movie.id} />)
          ) : (
            <p className="col-span-full text-center text-gray-500 dark:text-gray-400">
              No movies found.
            </p>
          )}
        </div>

        {/* Pagination */}
        {movies.length > 0 && (
          <div className="mt-6">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Movies;
