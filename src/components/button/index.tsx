import React from "react";
import style from "./style.module.scss";

interface Props{
  onClick:any
}

export const Button = (props:Props):JSX.Element =>{

  return(
    <button onClick={props.onClick} className={style.button}>Load more</button>
  );
};

export default Button;
