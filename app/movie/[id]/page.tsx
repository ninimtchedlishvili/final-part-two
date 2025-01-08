import React from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/app/components/layout/Header";
import Footer from "@/app/components/layout/Footer";
import { MoviePropsParams } from "@/types/types";
import FavouriteMovies from "@/app/components/favouriteMovies/Page";

export default async function Movies({ params }: MoviePropsParams) {
  const { id } = params;
  // console.log(id);
  const IMG_PATH = "https://image.tmdb.org/t/p/w1280";

  const data = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=3fd2be6f0c70a2a598f084ddfb75487c`
  );
  const movie = await data.json();

  return (
    <>
      <Header />
      <section className="py-16 bg-gray-900 flex justify-center items-center mx-auto h-screen">
        <div className="max-w-screen-xl px-6 mx-auto">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
              <li className="inline-flex items-center">
                <Link
                  href="/home"
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
                </Link>
                <span className="text-gray-500 mx-2"> &gt; </span>
                <p className="inline-flex items-center text-sm font-medium text-gray-400 ">
                  {movie?.title}
                </p>
              </li>
            </ol>
          </nav>

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

              <hr className="my-8 border-gray-600" />

              <div className="mt-8 gap-4 flex justify-center lg:justify-start">
                <FavouriteMovies id={movie.id} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
