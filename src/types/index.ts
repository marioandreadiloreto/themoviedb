
export interface Movie {
  title: string,
  overview: string,
  poster_path: string,
  release_date: string,
}

export interface MovieResponse {
  page: number,
  results: Movie[],
  total_pages: number,
  total_results: number
}
