import axios from "axios";

export const SET_STREET = "SET_STREET";
export const SET_HOUSE = "SET_HOUSE";
export const SET_FLAT = "SET_FLAT";

export const FETCH_USERS = 'FETCH_USERS';
export const CLEAR_USERS = 'CLEAR_USERS';
export const DELETE_USER = 'DELETE_USER';
export const SET_USER = 'SET_USER'; 

export const SHOW_MODAL = 'SHOW_MODAL';
export const HIDE_MODAL = 'HIDE_MODAL';

export const SHOW_LOADER = "SHOW_LOADER";
export const HIDE_LOADER = "HIDE_LOADER";

export const deleteUser = (api, payload) => {
  const apiPrefix = "bind_client/" + payload;

  return (dispatch) => {
    dispatch(showLoader());
    axios
      .delete(api + apiPrefix)
      .then((res) => {
        // console.log(res);
        if (res.status === 200) {
          dispatch({
            type: DELETE_USER,
            payload: res.data,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
    dispatch(hideLoader());
  };
}

export const setUser = (state) => {
  return {
    type: SET_USER,
    payload: state,
  };
}


export const showModal = (state) => {
 
  return {
    type: SHOW_MODAL,
    payload: state,
  };
}

export const hideModal = (state) => {
  return {
    type: HIDE_MODAL,
    payload: state,
  };
}

export const showLoader = () => {
  return {
    type: SHOW_LOADER,
  };
};

export const hideLoader = () => {
  return {
    type: HIDE_LOADER,
  };
};

export const setStreet = (state) => {
  return {
    type: SET_STREET,
    payload: state,
  };
};

export const setFlat = (state) => {
  return {
    type: SET_FLAT,
    payload: state,
  };
};

export const setHouse = (state) => {
  return {
    type: SET_HOUSE,
    payload: state,
  };
};

export const clearUsers = () => {
  return {
    type: CLEAR_USERS,

  }
}

export const fetchUsers = (api, payload) => {
  const apiPrefix = "clients?addressId=" + payload;

  return (dispatch) => {
    dispatch(showLoader());
    axios
      .get(api + apiPrefix)
      .then((res) => {
        // console.log(res);
        if (res.status === 200) {
          dispatch({
            type: FETCH_USERS,
            payload: res.data,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
    dispatch(hideLoader());
  };
};

