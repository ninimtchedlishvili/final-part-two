import React from "react";
import Image from "next/image";
import Footer from "@/app/(protected)/components/layout/Footer";
import FavouriteMovies from "@/app/(protected)/components/favouriteMovies/Page";
import SeatMap from "@/app/(protected)/components/seatMap/Seatmap";

type Movie = {
  id: number;
  title: string;
  poster_path: string | null;
  vote_average: number;
  vote_count: number;
  release_date: string | null;
  overview: string;
  backdrop_path: string | null;
  popularity: number;
};

interface MoviePageProps {
  params: Promise<{ id: string }>;
}

const IMG_PATH = "https://image.tmdb.org/t/p/w1280";

const Movies = async ({ params }: MoviePageProps) => {
  const { id } = await params;

  const data = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=3fd2be6f0c70a2a598f084ddfb75487c`
  );
  const movie: Movie = await data.json();

  return (
    <>
      <section className="bg-gray-900 flex justify-center items-center min-h-screen p-6">
        <div className="max-w-screen-xl w-full grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="flex flex-col items-center lg:items-start w-full">
            <div className="max-w-md lg:max-w-lg rounded-lg shadow-xl overflow-hidden">
              <Image
                src={`${IMG_PATH}${movie?.backdrop_path}`}
                alt={movie?.title || "Movie Image"}
                width={700}
                height={700}
                className="w-full h-auto object-cover rounded-lg"
              />
            </div>
            <h1 className="text-3xl font-bold text-white mt-6 text-center lg:text-left">
              {movie?.title || "Movie Title"}
            </h1>
            <p className="text-lg text-gray-200 mt-2">
              {movie?.release_date || "Release Date Unknown"}
            </p>
            <div className="flex items-center gap-4 mt-4">
              <div className="flex items-center gap-2 text-yellow-400">
                <p className="text-xl font-bold">
                  {Math.round(movie?.vote_average)}/10
                </p>
              </div>
              <p className="text-sm font-medium text-gray-300">
                ({movie?.vote_count} reviews)
              </p>
            </div>
            <p className="mt-6 text-lg text-gray-200 text-center lg:text-left">
              {movie?.overview || "No description available."}
            </p>
            <div className="mt-6">
              <FavouriteMovies id={movie.id} />
            </div>
          </div>

          <div className="flex flex-col items-center lg:items-start w-full lg:w-2/3">
            <SeatMap />
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Movies;
