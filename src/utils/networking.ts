import { MovieResponse } from "../types";

const keyValueQuery = {
  searchMovie: "search/movie",
  searchCollection: "search/collection",
  discover: "discover/movie",
};

const buildUrl = (url: string, params?: any) => {

  let fullParams:any = {
    api_key: process.env.REACT_APP_API_KEY,
  };

  const fullUrl = `${process.env.REACT_APP_BACKEND_URL}${url}`;
  if (params) {
    fullParams = { ...fullParams, ...params };
  }

  return `${fullUrl}/?${new URLSearchParams(fullParams).toString()}`;
};

const get = async <Type>(url: string, params?: any): Promise<Type> => {
  const response = await fetch(buildUrl(url, params));
  const json = await response.json();
  console.log("lis", json);
  return json;
};

export const discover = async (page: number): Promise<MovieResponse> => {
  const movies: Promise<MovieResponse> = get(keyValueQuery.discover, {page});
  return movies;
};

export const searchMovie = async (query: string, page: number): Promise<MovieResponse> => {
  const movies: Promise<MovieResponse> = get(keyValueQuery.searchMovie, {query, page});
  return movies;
};
