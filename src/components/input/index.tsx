import * as React from "react";

import style from "./style.module.scss";

export interface Props {
  id: string;
  onChange: React.ChangeEventHandler<HTMLInputElement> ;
  text:string;
  testId?: string;
  type?: string;
  placeholder?: string;
}

const Input = (props: Props): JSX.Element => (
  <div className={style.wrapper}>
    <input
      data-testid={props.testId}
      id={props.id}
      name={props.id}
      onChange={props.onChange}
      value={props.text}
      placeholder={props.placeholder || ""}
      type={props.type || "text"}
    />
  </div>
);

export default Input;
