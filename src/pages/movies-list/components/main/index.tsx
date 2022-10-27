import React from "react";
import Button from "../../../../components/button";
import Input from "../../../../components/input";
import style from "./style.module.scss";
import { Movie } from "../../../../types";
import Card from "../../../../components/card";

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
              <Card
                film={film}
                index={index}
                key={index}
              />
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
