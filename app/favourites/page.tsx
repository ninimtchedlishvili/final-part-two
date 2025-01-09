"use client";
import React, { useState, useEffect } from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Image from "next/image";
import Link from "next/link";
import { Movie } from "@/types/types";

const Page = () => {
  const [moviesList, setMoviesList] = useState<number[]>([]);
  const [moviesData, setMoviesData] = useState<Movie[]>([]);
  const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
  const API_KEY = "3fd2be6f0c70a2a598f084ddfb75487c";

  // Load movies list from localStorage
  useEffect(() => {
    const savedMovies = JSON.parse(localStorage.getItem("moviesList") || "[]");
    setMoviesList(savedMovies);
  }, []);

  // Fetch movie data based on movie IDs
  useEffect(() => {
    const fetchMovies = async () => {
      const fetchedMovies = await Promise.all(
        moviesList.map(async (id) => {
          const res = await fetch(
            `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
          );
          return await res.json();
        })
      );
      setMoviesData(fetchedMovies);
    };

    if (moviesList.length > 0) fetchMovies();
  }, [moviesList]);

  const removeMovie = (id: number) => {
    const updatedMoviesList = moviesList.filter((movieId) => movieId !== id);
    setMoviesList(updatedMoviesList);
    localStorage.setItem("moviesList", JSON.stringify(updatedMoviesList)); // Update localStorage
  };

  return (
    <>
      <Header />
      <div className="max-w-screen-xl mx-auto p-4">
        <nav aria-label=" p-4 ">
          <ol className="inline-flex items-center space-x-1  md:space-x-2 rtl:space-x-reverse ml-4">
            <li className="inline-flex items-center ">
              <Link
                href="/home"
                className="inline-flex items-center text-sm font-medium text-gray-300 hover:text-primary-600 dark:text-gray-400 dark:hover:text-white"
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
              </Link>
              <span className="text-gray-500 mx-2"> &gt; </span>
              <p className="inline-flex items-center text-sm font-medium text-gray-400">
                Favourites
              </p>
            </li>
          </ol>
        </nav>

        <div className="py-8">
          {moviesData.length === 0 ? (
            <p className="text-center text-white">
              No favourite movies added yet.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {moviesData.map((movie) => (
                <div
                  key={movie.id}
                  className="flex flex-col bg-gray-800 rounded-lg shadow-lg p-6"
                >
                  <Image
                    src={`${IMG_PATH}${
                      movie.backdrop_path || movie.poster_path
                    }`}
                    alt={movie.title}
                    width={150}
                    height={225}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-white">
                      {movie.title}
                    </h2>
                    <p className="text-sm text-gray-400 mt-2">
                      Release Date: {movie.release_date || "Unknown"}
                    </p>
                    <p className="text-yellow-400 mt-2">
                      Rating: {Math.round(movie.vote_average)}/10 (
                      {movie.vote_count} reviews)
                    </p>

                    <button
                      onClick={() => removeMovie(movie.id)}
                      className="mt-4 text-red-500 hover:text-red-700 font-semibold transition-colors"
                    >
                      Remove from Favourites
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Page;
