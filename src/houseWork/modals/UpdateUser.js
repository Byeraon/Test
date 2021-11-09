import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUsers,
  hideLoader,
  hideModal,
  showLoader,
  updateUser,
} from "../../redux/actions";
import style from "./updateUser.module.css";

export const UpdateUser = () => {
  const dispatch = useDispatch();
  const userRef = {
    name: useRef(),
    email: useRef(),
    phone: useRef(),
  };
  const { currentUser } = useSelector((store) => store.usersReducer);
  const { flat } = useSelector((store) => store.housesReducer);
  const closeModal = () => {
    dispatch(hideModal("changePerson"));
  };

  const updating = () => {
    if (userRef.phone.current.value.length > 0) {
      dispatch(showLoader());
      dispatch(
        updateUser("https://dispex.org/api/vtest/HousingStock/", {
          ...profile,
          name: userRef.name.current.value,
          email: userRef.email.current.value,
          phone: userRef.phone.current.value,
        })
      ).then(() => {
        dispatch(
          fetchUsers("https://dispex.org/api/vtest/HousingStock/", flat.id)
        );
        dispatch(hideLoader());
      });
    } else {
      alert("Номер телефона - обязательный параметр!");
    }
  };

  const profile = currentUser.user;
  return (
    <div className={style.modalWindow}>
      <button onClick={closeModal} className={style.cross}></button>
      <p>Редактирование пользователя {profile.name}</p>
      <div className={style.inputPlace}>
        <input
          ref={userRef.name}
          defaultValue={profile.name}
          placeholder="Имя"
        ></input>
        <input
          ref={userRef.email}
          defaultValue={profile.email}
          placeholder="E-Mail"
        ></input>
        <input
          ref={userRef.phone}
          defaultValue={profile.phone}
          placeholder="Номер телефона"
        ></input>
      </div>
      <button className={style.sendButton} onClick={updating}>
        Изменить
      </button>
    </div>
  );
};
