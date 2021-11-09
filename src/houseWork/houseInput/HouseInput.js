import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import style from "./houseInput.module.css";

export const HouseInput = ({ name, change, array }) => {
  const [inputValue, setValue] = useState("");
  const { street, house } = useSelector((state) => state.housesReducer);
  useEffect(() => {
    if (name === "flats") {
      setValue("");
    }
  }, [street, house, name]);
  useEffect(() => {
    if (name === "homes") {
      setValue("");
    }
  }, [street, name]);
  return (
    <div
      style={array.length > 0 ? {} : { width: "0px", margin: 0 }}
      className={style.inputPlace}
    >
      <input
        style={
          array.length > 0
            ? {}
            : { width: "0px", padding: 0, opacity: 0, borderWidth: 0 }
        }
        value={inputValue}
        onChange={(event) => {
          setValue(event.target.value);
        }}
        list={name}
        placeholder={
          name === "streets" ? "Улица" : name === "homes" ? "Дом" : "Кв./Офис"
        }
      ></input>
      <div className={style.listOptions} id={name}>
        {array
          .filter((el) =>
            el.name.toUpperCase().indexOf(inputValue.toUpperCase()) === -1
              ? false
              : true
          )
          .map((el) => (
            <button
              key={el.id}
              onClick={(event) => {
                change(el.name, array, name);
                setValue(el.name);
              }}
            >
              {el.name}
            </button>
          ))}
      </div>
    </div>
  );
};
//onClick={(event) => {change(event.target.value, array, name)}}
