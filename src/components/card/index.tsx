import React from "react";
import { Movie } from "../../types";
import style from "./style.module.scss";
import notFound from "../../assets/not-found.png";

interface Props{
  index: number,
  film: Movie,
}

export const Card = (props:Props):JSX.Element =>{

  return(
    <div key={"cont-"+props.index} className={style.element}>
      <h1 key={"h1"+props.index}>{props.film.title} ({props.film.release_date?.split("-")[0] == null || props.film.release_date == "" ? "n.d" : props.film.release_date?.split("-")[0]})</h1>
      <span key={props.index}>{props.film.overview}</span>
      {
        props.film.poster_path != null?
          <img key={"img"+props.index} src={"https://image.tmdb.org/t/p/w500/"+ props.film.poster_path.replace("/","")} className={style.image}/>
          :
          <img key={"img"+props.index} src={notFound} width="300" height="300" className={style.image}/>
      }
    </div>
  );
};

export default Card;
