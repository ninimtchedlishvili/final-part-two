import React from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import moviesList from "@/app/components/favouriteMovies/Page";
import Image from "next/image";

const page = ({}) => {
  const IMG_PATH = "https://image.tmdb.org/t/p/w1280";

  console.log(moviesList);
  return (
    <>
      <Header />
      {moviesList.map((movie) => {
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 xl:gap-6 mt-8">
          <div className="shrink-0 max-w-md lg:max-w-lg lg:col-span-1 rounded-lg shadow-xl overflow-hidden">
            <Image
              src={`${IMG_PATH}${movie?.backdrop_path}`}
              alt={movie?.title || "Movie Image"}
              width={700}
              height={700}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>

          {/* Movie Details Section */}
          <div className="mt-8 lg:mt-0 lg:col-span-1 text-center lg:text-left">
            <h1 className="text-3xl font-bold text-white sm:text-4xl md:text-5xl">
              {movie?.title || "Movie Title"}
            </h1>
            <p className="text-lg text-gray-200 mt-2">
              {movie?.release_date || "Release Date Unknown"}
            </p>
            <div className="flex justify-center lg:justify-start items-center gap-4 mt-4">
              <div className="flex items-center gap-2 text-yellow-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 17l4 4-4-4-4 4 4-4zm0-6l4-4-4 4-4-4 4 4zm0-6l4-4-4 4-4-4 4 4z"
                  />
                </svg>
                <p className="text-xl font-bold">
                  {Math.round(movie?.vote_average)}/10
                </p>
              </div>
              <p className="text-sm font-medium leading-none text-gray-300">
                ({movie?.vote_count} reviews)
              </p>
            </div>
            <p className="mt-6 text-lg text-gray-200">
              {movie?.overview || "No description available."}
            </p>
          </div>
        </div>;
      })}

      <div>page</div>
      <Footer />
    </>
  );
};

export default page;
