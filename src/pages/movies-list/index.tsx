import Main from "./components/main";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { discover, searchMovie } from "../../utils/networking";
import { Movie, MovieResponse } from "../../types";

const MoviesList = (): JSX.Element => {

  // const [list, setList] = useState<any>(undefined);
  const [list, setList] = useState<Array<Movie>>([]);
  const [totPages, setTotPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [text, setText] = useState("");
  const timeout: any = useRef(undefined);

  const fetchData = async (query: string, page: number): Promise<void> => {
    //when the page loads it shows the latest releases
    // let result: any;
    let result: MovieResponse;
    if (!query) {
      result = await discover(page);
    } else {
      result = await searchMovie(query, page);
    }

    if (page == 1) {
      setList(result.results);
      setTotPages(result.total_pages);
    } else {
      setList((state: Movie[]) => [...state, ...result.results]);
      setTotPages(result.total_pages);

    }
  };

  useEffect((): any => {

    const { query }: any = Object.fromEntries(new URLSearchParams(window.location.search));
    setText(query ?? "");

    fetchData(query, 1);

    return () => {
      clearTimeout(timeout.current);
    };
  }, []);

  const onChangeText = (event: any) => {
    clearTimeout(timeout.current);

    const url = new URL(`${window.location.origin}${window.location.pathname}`);

    const id = setTimeout(async () => {

      if (event.target.value === "") {
        url.searchParams.delete("query");
        fetchData("", 1);
      } else {
        url.searchParams.set("query", event.target.value);
        fetchData(event.target.value, 1);
      }

      window.history.pushState({}, "", url);

    }, 300);

    timeout.current = id;
    setText(event.target.value);
  };

  const onClickNext = (): void => {

    const updatedPage = currentPage + 1;
    setCurrentPage(updatedPage);
    fetchData(text, updatedPage);
  };

  return (
    <Main
      list={list}
      currentPage={currentPage}
      onClickNext={onClickNext}
      onChangeText={onChangeText}
      text={text}
      totalPages={totPages}
    />
  );
};

export default MoviesList;
