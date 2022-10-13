import React from "react";
import Button from "../../../../components/button";
import notFound from "../../../../assets/not-found.png";
import Input from "../../../../components/input";
import style from "./style.module.scss";
import { Movie } from "../../../../types";

interface Props{
  list: Movie[];
  onClickNext: any;
  onChangeText: any;
  currentPage: number;
  text:string;
  totalPages: number;
}

const Main = (props: Props): JSX.Element => (
  <div className={style.wrapper}>
    <Input
      testId="search-bar"
      id="1"
      placeholder="Find a movie"
      onChange={props.onChangeText}
      text={props.text}
    />
    {props.list.length == 0 ?

      <div className={style.notFound}>
        <span>Film &quot;{props.text}&quot; not found :(</span>
      </div>

      :

      <>
        <div className={style.list}>

          {
            props.list.map((film:Movie, index:number):JSX.Element => (
              <div key={"cont-"+index} className={style.element}>
                <h1 key={"h1"+index}>{film.title} ({film.release_date?.split("-")[0] == null || film.release_date == "" ? "n.d" : film.release_date?.split("-")[0]})</h1>
                <span key={index}>{film.overview}</span>
                {
                  film.poster_path != null?
                    <img key={"img"+index} src={"https://image.tmdb.org/t/p/w500/"+ film.poster_path.replace("/","")} className={style.image}/>
                    :
                    <img key={"img"+index} src={notFound} width="300" height="300" className={style.image}/>
                }
              </div>
            ))
          }
        </div>
        <div className={style.loadMore}>
          {
            props.currentPage === props.totalPages ?
              <span>No more data</span>
              :
              <Button onClick={props.onClickNext}></Button>
          }
        </div>
      </>
    }
  </div>
);

export default Main;
