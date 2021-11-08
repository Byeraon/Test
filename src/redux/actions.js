import axios from "axios";

export const SET_STREET = "SET_STREET";
export const SET_HOUSE = "SET_HOUSE";
export const SET_FLAT = "SET_FLAT";

export const SHOW_LOADER = "SHOW_LOADER";
export const HIDE_LOADER = "HIDE_LOADER";

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

/*
export const fetchHouse = (api, payload) => {
  const apiPrefix = "houses/" + payload;

  return (dispatch) => {
    dispatch(showLoader());
    axios
      .get(api + apiPrefix)
      .then((res) => {
        // console.log(res);
        if (res.status === 200) {
          dispatch({
            type: FETCH_HOUSE,
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
*/
