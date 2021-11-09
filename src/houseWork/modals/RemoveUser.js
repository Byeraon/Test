import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUser,
  fetchUsers,
  hideLoader,
  hideModal,
  showLoader,
} from "../../redux/actions";
import style from "./removeUser.module.css";

export const RemoveUser = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((store) => store.usersReducer);
  const { flat } = useSelector((store) => store.housesReducer);
  const closeModal = () => {
    dispatch(hideModal("deletePerson"));
  };
  const deleting = () => {
    dispatch(showLoader());
    dispatch(
      deleteUser("https://dispex.org/api/vtest/HousingStock/", profile.id)
    ).then(() => {
      dispatch(
        fetchUsers("https://dispex.org/api/vtest/HousingStock/", flat.id)
      );
      dispatch(hideLoader());
    });
  };

  const profile = currentUser.user;
  return (
    <div className={style.modalWindow}>
      <button onClick={closeModal} className={style.cross}></button>
      <p>Вы уверены, что хотите удалить пользователя {profile.name}?</p>
      <button className={style.sendButton} onClick={deleting}>
        Да
      </button>
    </div>
  );
};
