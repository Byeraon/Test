import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser } from "../../redux/actions";
import style from './removeUser.module.css'

export const RemoveUser = () => {
    
    const dispatch = useDispatch(); 
    
    const { currentUser } = useSelector(store => store.usersReducer);
    const profile = currentUser.user;
    return <div className={style.modalWindow}>
        <p>Вы уверены, что хотите удалить пользователя {profile.name}?</p>
        <button onClick={() => {dispatch(deleteUser('https://dispex.org/api/vtest/HousingStock/', profile.id))}}>Да</button>
    </div>
}