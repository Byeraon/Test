import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUsers,
  hideLoader,
  hideModal,
  showLoader,
  updateUser,
} from "../../redux/actions";
import style from "./addPerson.module.css";

export const AddPerson = () => {
  const dispatch = useDispatch();
  const userRef = {
    name: useRef(),
    email: useRef(),
    phone: useRef(),
    id: useRef(),
    bindId: useRef(),
  };

  const { flat } = useSelector((store) => store.housesReducer);
  const closeModal = () => {
    dispatch(hideModal("addPerson"));
  };

  const updating = () => {
    if (userRef.phone.current.value.length > 0) {
      dispatch(showLoader());
      dispatch(
        updateUser("https://dispex.org/api/vtest/HousingStock/", {
          id:
            userRef.id.current.id.length > 0
              ? userRef.id.current.value
              : undefined,
          bindId:
            userRef.bindId.current.value.length > 0
              ? userRef.bindId.current.value
              : undefined,
          name: userRef.name.current.value,
          email: userRef.email.current.value,
          phone: userRef.phone.current.value,
        })
      ).then(() => {
        if (flat) {
          dispatch(
            fetchUsers("https://dispex.org/api/vtest/HousingStock/", flat.id)
          );
          dispatch(hideLoader());
        }
      });

      closeModal();
    } else {
      alert("Номер телефона - обязательный параметр!");
    }
  };

  return (
    <div className={style.modalWindow}>
      <button onClick={closeModal} className={style.cross}></button>
      <p>Добавление пользователя / Редактирование существующего</p>
      <div className={style.inputPlace}>
        <input ref={userRef.name} placeholder="Имя"></input>
        <input ref={userRef.email} placeholder="E-Mail"></input>
        <input ref={userRef.phone} placeholder="Номер телефона"></input>
        <input ref={userRef.id} placeholder="Id(Опционально)"></input>
        <input ref={userRef.bindId} placeholder="BindId(Опционально)"></input>
      </div>
      <button className={style.sendButton} onClick={updating}>
        Добавить
      </button>
    </div>
  );
};
