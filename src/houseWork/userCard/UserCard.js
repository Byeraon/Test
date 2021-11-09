import React from "react";
import { useDispatch } from "react-redux";
import { setUser, showModal } from "../../redux/actions";
import style from './userCard.module.css';

export const UserCard = (user) => {
    const dispatch = useDispatch();

    const deleteUser = () => {
        dispatch(setUser(user))
        dispatch(showModal('deletePerson'))
    }

    const updateUser = () => {
        dispatch(setUser(user))
        dispatch(showModal('changePerson'))
    }

    const profile = user.user;
    return <div className={style.place}>
        <div className={style.card}>
            <div className={style.logo}></div>
            <p>Имя - {profile.name}</p>
            <p>Телефон - {profile.phone}</p>
            <p>Email - {profile.email}</p>
            <div onClick={deleteUser} className={style.trash}></div>
            <div onClick={updateUser} className={style.edit}></div>
        </div>
    </div>
}