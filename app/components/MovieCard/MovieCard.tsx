import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Movie } from "@/types/types";


const MovieCard = ({ movie } : {movie: Movie}) => {

    
  const IMG_PATH = "https://image.tmdb.org/t/p/w1280";

  return (
    <div
    className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800"
    key={movie.id}
  >
    <div className="relative h-[200px] w-full">
      {" "}
      <Image
        src={`${IMG_PATH}${movie?.backdrop_path}`}
        alt={movie?.title || "Movie Image"}
        width={1280}
        height={720}
      />
    </div>
    <div className="pt-6">
      <h1 className="text-lg font-semibold leading-tight text-gray-900 hover:underline dark:text-white">
        {movie?.title.slice(0, 25)}
      </h1>
      {/* </Link> */}
      <div className="mt-2 flex items-center gap-2">
        <p className="text-md font-medium text-white">
          {Math.round(movie?.vote_average)}
        </p>
        <p className="text-sm font-medium text-gray-500 ">
          ({movie?.vote_count} reviews)
        </p>
      </div>
      <div className="mt-4 flex items-center justify-between gap-4">
        <p className="text-md text-white">{movie?.release_date}</p>
        <p className="text-md text-white">{movie?.popularity}</p>
       
      </div>
      <Link href={`/movie/${movie.id}`}>
          <button
            type="button"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded mt-2"
          >
            View More
          </button>
        </Link>
    </div>
  </div>
  )
}

export default MovieCard