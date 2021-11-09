import {
  SET_FLAT,
  SET_HOUSE,
  SET_STREET,
  SHOW_LOADER,
  FETCH_USERS,
  HIDE_LOADER,
  CLEAR_USERS,
  SET_USER,
  SHOW_MODAL,
  HIDE_MODAL
} from "./actions";

const houseInitialState = {
  flat: undefined,
  house: undefined,
  street: undefined,
  loading: false,
};

const usersInitialState = {
  currentUser: {},
  modals: {
    deletePerson: false,
    changePerson: false,
    addPerson: false
  },
  users: []
}

export const usersReducer = (state = usersInitialState, action) => {
  switch (action.type) {
    case SET_USER: return {...state, currentUser: action.payload}
    case SHOW_MODAL: {
      if (action.payload === 'deletePerson') {
        return {...state, modals: {...state.modals, deletePerson: true}}
      } else if (action.payload === 'changePerson') {
        
        return {...state, modals: {...state.modals, changePerson: true}}
      } else if (action.payload === 'addPerson') {
        return {...state, modals: {...state.modals, addPerson: true}}
      }
      break;
    }
    case HIDE_MODAL: {
      if (action.payload === 'deletePerson') {
        return {...state, modals: {...state.modals, deletePerson: false}}
      } else if (action.payload === 'changePerson') {
        return {...state, modals: {...state.modals, changePerson: false}}
      } else if (action.payload === 'addPerson') {
        return {...state, modals: {...state.modals, addPerson: false}}
      }
      break;
    }
    case FETCH_USERS:
      return { ...state, users: action.payload };
    case CLEAR_USERS:
      return {...state, users: []}
    default:
      return state;
  }
}

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
