import { MovieResponse } from "../types";

const keyValueQuery = {
  searchMovie: "search/movie",
  searchCollection: "search/collection",
  discover: "discover/movie",
};

export const getCachedData = async (cacheName: string, url: string): Promise<Response | undefined> => {
  const cacheStorage = await caches.open(cacheName);
  const cachedData = await cacheStorage.match(url);

  if (!cachedData || !cachedData.ok) {

    //cache empty
    return undefined;
  } else {

    const response = await cachedData;
    const date = new Date(response.headers.get("date") ?? "");
    // if cached response is older than 6 hours we delete it and return undefined, so the get will replace it with a new one
    if(Date.now() > date.getTime() + 1000 * 60 * 60 * 6){
      await cacheStorage.delete(url);
      return undefined;
    }
    //if cached response exists and it's not older than 6 hour
    return response;
  }

};

export const buildUrl = (url: string, params?: any, includeApiKey = true) => {

  let fullParams: any = {};

  if (includeApiKey) {
    fullParams.api_key = process.env.REACT_APP_API_KEY;
  }

  const fullUrl = `${process.env.REACT_APP_BACKEND_URL}${url}`;
  if (params) {
    fullParams = { ...fullParams, ...params };
  }

  return `${fullUrl}/?${new URLSearchParams(fullParams).toString()}`;
};

const get = async <Type>(url: string, params?: any): Promise<Type> => {

  const cacheUrl = url +
    params ?
    "?" + new URLSearchParams(params).toString()
    :
    "";
  const cachedData = await getCachedData("MyCache", cacheUrl);

  if (cachedData) {
    return await cachedData.json();
  } else {

    if (navigator.onLine) {

      const toReturnResponse = await fetch(buildUrl(url, params)).then((response: Response) => {
        //response cloned to consume body multiple time
        const clonedResponse = response.clone();
        if ("caches" in window) {
          caches.open("MyCache").then((cache) => {
            cache.put(cacheUrl, response);
          });
        }
        return clonedResponse;
      });

      return await toReturnResponse.json();
    } else {
      alert("You are offline :( \ncheck your internet connection and retry");
      const emptyMovieResponse: MovieResponse = { page: 1, results: [], total_pages: 0, total_results: 0 };
      const response = new Response(JSON.stringify(emptyMovieResponse));
      return await response.json();
    }

  }

};

export const discover = async (page: number): Promise<MovieResponse> => {
  const movies: Promise<MovieResponse> = get(keyValueQuery.discover, { page });
  return movies;
};

export const searchMovie = async (query: string, page: number): Promise<MovieResponse> => {
  const movies: Promise<MovieResponse> = get(keyValueQuery.searchMovie, { query, page });
  return movies;
};
