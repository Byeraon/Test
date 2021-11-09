import React, { useEffect, useState, useLayoutEffect } from "react";
import style from "./houses.module.css";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { HouseInput } from "./houseInput/HouseInput";
import { clearUsers, fetchUsers, setFlat, setHouse, setStreet } from "../redux/actions";
import { UserCard } from "./userCard/UserCard";
import { RemoveUser } from "./modals/RemoveUser";

export const Houses = () => {
  const dispatch = useDispatch();
  const { street, house, flat } = useSelector((state) => state.housesReducer);
  const { users, modals } = useSelector((state) => state.usersReducer);
  const [streets, setStreets] = useState([]);
  const [flats, setFlats] = useState([])
  const [homes, setHomes] = useState([])


  const checkTrueValue = (value, array, type) => {
    switch (type) {
      case 'streets': {
        if (array.map((el) => el.name).indexOf(value) !== -1) {
          console.log(street);
          console.log(array.find((street) => street.name === value));
          dispatch(setStreet(array.find((street) => street.name === value)));
          console.log(street);
        }
        break;
      }
      case 'homes': {
        if (array.map((el) => el.name).indexOf(value) !== -1) {
          console.log(array.find((home) => home.name === value), 'truehome');
          dispatch(setHouse(array.find((home) => home.name === value)))
          console.log(house)
        }
        break;
      }
      case 'flats': {
        if (array.map((el) => el.name).indexOf(value) !== -1) {
          console.log(value);

          dispatch(setFlat(array.find((flat) => flat.name === value)))

        }
        break;
      }
      default: return 0
    }

  };



  useEffect(() => {
    console.log(house, 'homed')
    if (house) {
      setFlats([])
      dispatch(setFlat(undefined))
      dispatch(clearUsers())
      axios({
        method: "get",
        url:
          "https://dispex.org/api/vtest/Request/house_flats/" + house.id,
      }).then(function (response) {
        setFlats(response.data);
        console.log(response.data);
      });
    }
  }, [house, dispatch]);

  useEffect(() => {
    console.log(users)
  }, [users])

  useEffect(() => {
    console.log(street);
    if (street) {
      setHomes([])
      setFlats([])
      dispatch(setHouse(undefined))
      dispatch(setFlat(undefined))
      dispatch(clearUsers())
      
      axios({
        method: "get",
        url: "https://dispex.org/api/vtest/Request/houses/" + street.id,
      }).then(function (response) {
        setHomes(response.data);
        console.log(response.data);
      });
    }
  }, [street, dispatch]);

  useEffect(() => {
    axios({
      method: "get",
      url: "https://dispex.org/api/vtest/Request/streets",
    }).then(function (response) {
      console.log(response.data);
      setStreets(response.data.filter(el => el.cityId === 1));
    });
  }, []);

  useEffect(() => {
    if (flat) {
      console.log(house, flat, street, 'newState')
      dispatch(fetchUsers('https://dispex.org/api/vtest/HousingStock/', flat.id))
    }
  }, [flat, dispatch])

  return (
    <div className={style.page}>
      {modals.deletePerson && <RemoveUser/>}
      <div className={style.chooseHome}>
        <HouseInput array={streets} name={'streets'} change={checkTrueValue} />
        <HouseInput array={homes} name={'homes'} change={checkTrueValue} />
        <HouseInput array={flats} name={'flats'} change={checkTrueValue} />
      </div>
      <div style={users.length > 0 ? {} : {margin: 0, maxHeight: 0}} className={style.persons}>
        <div className={style.connect}></div>
        {users.map(el => 
          <UserCard user={el}/>
        )}
      </div>
    </div>
  );
};
