import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  bindUser,
  fetchUsers,
  hideLoader,
  hideModal,
  showLoader,
} from "../../redux/actions";
import style from "./addPerson.module.css";

export const BindUser = () => {
  const dispatch = useDispatch();
  const userRef = {
    phone: useRef(),
  };

  const { flat } = useSelector((store) => store.housesReducer);
  const closeModal = () => {
    dispatch(hideModal("bindPerson"));
  };

  async function getIdByPhone(phone) {
    const response = await fetch(
      `https://dispex.org/api/vtest/HousingStock/client?phone=${phone}`
    );
    const id = await response.json();
    return id.id;
  }

  async function binding() {
    if (userRef.phone.current.value.length > 0) {
      dispatch(showLoader());
      dispatch(
        bindUser("https://dispex.org/api/vtest/HousingStock/", {
          ClientId: await getIdByPhone(userRef.phone.current.value),
          AddressId: flat.id,
        })
      ).then(() => {
        if (flat) {
          dispatch(
            fetchUsers("https://dispex.org/api/vtest/HousingStock/", flat.id)
          );
        }
      });
      dispatch(hideLoader());

      closeModal();
    } else {
      alert("Номер телефона - обязательный параметр!");
    }
  }

  return (
    <div className={style.modalWindow}>
      <button onClick={closeModal} className={style.cross}></button>
      <p>Привязка жильца по номеру телефона</p>
      <div className={style.inputPlace}>
        <input ref={userRef.phone} placeholder="Номер телефона"></input>
      </div>
      <button className={style.sendButton} onClick={binding}>
        Привязать
      </button>
    </div>
  );
};
