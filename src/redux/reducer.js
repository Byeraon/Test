import {
  SET_FLAT,
  SET_HOUSE,
  SET_STREET,
  SHOW_LOADER,
  HIDE_LOADER,
} from "./actions";

const houseInitialState = {
  flat: undefined,
  house: undefined,
  street: undefined,
  loading: false,
};

export const housesReducer = (state = houseInitialState, action) => {
  switch (action.type) {
    case SET_FLAT:
      return { ...state, flat: action.payload };
    case SET_HOUSE:
      return { ...state, house: action.payload };
    case SET_STREET:
      return { ...state, street: action.payload };
    case SHOW_LOADER:
      return { ...state, loading: true };
    case HIDE_LOADER:
      return { ...state, loading: false };
    default:
      return state;
  }
};
