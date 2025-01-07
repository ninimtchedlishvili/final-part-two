export type Movie = {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  vote_count: number;
  release_date: string;
  overview: string;
  backdrop_path:string,
};

export type MovieProps = {
  movies: Movie[];
};


export type MoviePropsParams = {
  params: { id: string };
};