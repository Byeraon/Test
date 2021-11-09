import React, { useEffect, useState } from "react";
import style from "./houses.module.css";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { HouseInput } from "./houseInput/HouseInput";
import {
  clearUsers,
  fetchUsers,
  setFlat,
  setHouse,
  setStreet,
  showModal,
} from "../redux/actions";
import { UserCard } from "./userCard/UserCard";
import { RemoveUser } from "./modals/RemoveUser";
import { UpdateUser } from "./modals/UpdateUser";
import { AddPerson } from "./modals/AddPerson";
import { BindUser } from "./modals/BindUser";

export const Houses = () => {
  const dispatch = useDispatch();
  const { street, house, flat } = useSelector((state) => state.housesReducer);
  const { users, modals } = useSelector((state) => state.usersReducer);
  const [streets, setStreets] = useState([]);
  const [flats, setFlats] = useState([]);
  const [homes, setHomes] = useState([]);

  const checkTrueValue = (value, array, type) => {
    switch (type) {
      case "streets": {
        if (array.map((el) => el.name).indexOf(value) !== -1) {
          dispatch(setStreet(array.find((street) => street.name === value)));
        }
        break;
      }
      case "homes": {
        if (array.map((el) => el.name).indexOf(value) !== -1) {
          dispatch(setHouse(array.find((home) => home.name === value)));
        }
        break;
      }
      case "flats": {
        if (array.map((el) => el.name).indexOf(value) !== -1) {
          dispatch(setFlat(array.find((flat) => flat.name === value)));
        }
        break;
      }
      default:
        return 0;
    }
  };

  useEffect(() => {
    if (house) {
      setFlats([]);
      dispatch(setFlat(undefined));
      dispatch(clearUsers());
      axios({
        method: "get",
        url: "https://dispex.org/api/vtest/Request/house_flats/" + house.id,
      }).then(function (response) {
        setFlats(response.data);
      });
    }
  }, [house, dispatch]);

  useEffect(() => {
    if (street) {
      setHomes([]);
      setFlats([]);
      dispatch(setHouse(undefined));
      dispatch(setFlat(undefined));
      dispatch(clearUsers());

      axios({
        method: "get",
        url: "https://dispex.org/api/vtest/Request/houses/" + street.id,
      }).then(function (response) {
        setHomes(response.data);
      });
    }
  }, [street, dispatch]);

  useEffect(() => {
    axios({
      method: "get",
      url: "https://dispex.org/api/vtest/Request/streets",
    }).then(function (response) {
      setStreets(response.data.filter((el) => el.cityId === 1));
    });
  }, []);

  useEffect(() => {
    if (flat) {
      dispatch(
        fetchUsers("https://dispex.org/api/vtest/HousingStock/", flat.id)
      );
    }
  }, [flat, dispatch]);

  return (
    <div className={style.page}>
      <div className={style.dispex}></div>
      <div className={style.fixContent}>
        {flat && house && street && (
          <button
            onClick={() => {
              dispatch(showModal("bindPerson"));
            }}
            className={style.connectUser}
          ></button>
        )}
        <button
          onClick={() => {
            dispatch(showModal("addPerson"));
          }}
          className={style.addUser}
        ></button>
        {modals.bindPerson && <BindUser />}
        {modals.addPerson && <AddPerson />}
        {modals.deletePerson && <RemoveUser />}
        {modals.changePerson && <UpdateUser />}
        <div className={style.chooseHome}>
          <HouseInput
            array={streets}
            name={"streets"}
            change={checkTrueValue}
          />
          <HouseInput array={homes} name={"homes"} change={checkTrueValue} />
          <HouseInput array={flats} name={"flats"} change={checkTrueValue} />
        </div>
        {flat && house && street && (
          <p
            className={style.adress}
          >{`г.${street.city}, ${street.prefix.shortName}.${street.name}, ${house.name}, ${flat.typeName} ${flat.name}`}</p>
        )}
        <div
          style={users.length > 0 ? {} : { margin: 0, maxHeight: 0 }}
          className={style.persons}
        >
          <div className={style.connect}></div>
          {users.map((el) => (
            <UserCard key={el.id} user={el} />
          ))}
        </div>
      </div>
    </div>
  );
};
