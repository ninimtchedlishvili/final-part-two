export type Movie = {
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

export type MoviesResponse = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};

export type MovieProps = {
  movies: MoviesResponse; 
};
