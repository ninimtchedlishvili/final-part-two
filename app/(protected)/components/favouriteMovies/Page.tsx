"use client";
import React, { useState, useEffect } from "react";

const FavouriteMovies = ({ id }: { id: number }) => {
  const [moviesList, setMoviesList] = useState<number[]>([]);

  useEffect(() => {
    const savedMovies = localStorage.getItem("moviesList");
    if (savedMovies) {
      setMoviesList(JSON.parse(savedMovies));
    }
  }, []); 

  useEffect(() => {
    if (moviesList.length > 0) {
      localStorage.setItem("moviesList", JSON.stringify(moviesList));
    }
  }, [moviesList]);

  const addMovie = () => {
    if (!moviesList.includes(id)) {
      setMoviesList((prevMoviesList) => [...prevMoviesList, id]);
    }
  };

  const removeMovie = () => {
    if (moviesList.includes(id)) {
      setMoviesList((prevMoviesList) =>
        prevMoviesList.filter((movieId) => movieId !== id)
      );
    }
  };


  return (
    <div className="flex gap-4">
      <button
        onClick={addMovie}
        disabled={moviesList.includes(id)}
        className={`${
          moviesList.includes(id)
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-950 hover:bg-blue-700"
        } text-white transition duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center font-semibold rounded-lg px-6 py-3`}
      >
        Add to Favourites
      </button>

      <button
        onClick={removeMovie}
        disabled={!moviesList.includes(id)}
        className={`${
          moviesList.includes(id)
            ? "bg-red-600 hover:bg-red-500"
            : "bg-gray-400 cursor-not-allowed"
        } text-white transition duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center font-semibold rounded-lg px-6 py-3`}
      >
        Remove from Favourites
      </button>
    </div>
  );
};

export default FavouriteMovies;
