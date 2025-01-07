import Image from "next/image";
import { Movie, MovieProps } from "@/types/types";
import Link from "next/link";

const Movies = ({ movies }: MovieProps) => {
  console.log(movies);

  const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
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
          {movies.map((movie: Movie) => (
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
                  <Link href={`/movie/${movie.id}`}>
                    <button
                      type="button"
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded"
                    >
                      View More
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="w-full text-center">
          {/* <Pagination

          /> */}
        </div>
      </div>
    </div>
  );
};

export default Movies;
