import React, { useEffect, useState, useLayoutEffect } from "react";
import style from "./houses.module.css";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setStreet } from "../redux/actions";

export const Houses = () => {
  const dispatch = useDispatch();
  const { street } = useSelector((state) => state.housesReducer);
  const [streets, setStreets] = useState([]);
  const [homes, setHomes] = useState(undefined);
  const [flats, setFlats] = useState(undefined);

  const [currentHome, setCurrentHome] = useState(undefined);
  const [currentFlat, setCurrentFlat] = useState(undefined);

  const checkTrueStreet = (value) => {
    if (streets.map((el) => el.name).indexOf(value) !== -1) {
      console.log(street);
      console.log(streets.find((street) => street.name === value));
      dispatch(setStreet(streets.find((street) => street.name === value)));
      console.log(street);
    }
  };

  const checkTrueHome = (value) => {
    if (homes.map((el) => el.name).indexOf(value) !== -1) {
      console.log(value);
      setCurrentHome(homes.find((home) => home.name === value));
    }
  };

  const checkTrueFlat = (value) => {
    if (flats.map((el) => el.name).indexOf(value) !== -1) {
      console.log(value);
      setCurrentFlat(flats.find((flat) => flat.name === value));
    }
  };

  useEffect(() => {
    if (currentHome) {
      axios({
        method: "get",
        url:
          "https://dispex.org/api/vtest/Request/house_flats/" + currentHome.id,
      }).then(function (response) {
        setFlats(response.data);
        console.log(response.data);
      });
    }
  }, [currentHome]);

  useEffect(() => {
    console.log(street);
    if (street) {
      axios({
        method: "get",
        url: "https://dispex.org/api/vtest/Request/houses/" + street.id,
      }).then(function (response) {
        setHomes(response.data);
        console.log(response.data);
      });
    }
  }, [street]);

  useEffect(() => {
    axios({
      method: "get",
      url: "https://dispex.org/api/vtest/Request/streets",
    }).then(function (response) {
      console.log(response.data);
      setStreets(response.data);
    });
  }, []);
  return (
    <div className={style.page}>
      <div className={style.chooseHome}>
        <div>
          <input
            onChange={(event) => checkTrueStreet(event.target.value)}
            list="streets"
          ></input>
          <datalist id="streets">
            {streets.map((el) => (
              <option value={el.name}></option>
            ))}
          </datalist>
        </div>
        {homes && (
          <div>
            <input
              onChange={(event) => checkTrueHome(event.target.value)}
              list="homes"
            ></input>
            <datalist id="homes">
              {homes.map((el) => (
                <option value={el.name}></option>
              ))}
            </datalist>
          </div>
        )}
        {flats && (
          <div>
            <input
              onChange={(event) => checkTrueFlat(event.target.value)}
              list="flats"
            ></input>
            <datalist id="flats">
              {flats.map((el) => (
                <option value={el.name}></option>
              ))}
            </datalist>
          </div>
        )}
      </div>
    </div>
  );
};
