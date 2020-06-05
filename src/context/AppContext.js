import React, { createContext, useReducer, useEffect } from 'react';
import { firebase } from './FirebaseContext';

const initialState = {
  user: {
    authenticated: false,
    name: '',
    uid: '',
    image: '',
  },
  doggos: [],
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'add_doggo':
      return { ...state, ...{ doggos: [...state.doggos, payload.doggo]} };
    case 'remove_doggo':
      return { ...state, ...{ doggos: state.doggos.filter(x => x.name !== payload.name )}}
    case 'logout_user':
    case 'login_user':
      return { ...state, ...{ user: payload.user }}
    case 'change_title':
      return { ...state, ...payload };
    case 'save_data':
      localStorage.setItem('data', JSON.stringify(state));
      if (state.user.authenticated) {
        firebase.saveDoggosForUser(state);
      }
      return state;
    case 'save_data_to_localstorage':
      localStorage.setItem('data', JSON.stringify(state));
      return state;
    case 'load_data':
      return {
        ...state,
        ...payload.data,
      }
    default:
    return state;
  }
};

const AppContext = createContext(initialState);
const { Provider } = AppContext;

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    firebase.auth.onAuthStateChanged((authUser) => {
      if (authUser !== null) {
        const { displayName, photoURL, uid} = authUser;
        dispatch({
          type: 'login_user',
          payload: {
            user: {
              name: displayName,
              picture: photoURL,
              uid,
              authenticated: true,
            },
          },
        });
        firebase.getDoggosForUser(dispatch);
        dispatch({ type: 'save_data_to_localstorage' });
      }
    });
  }, [])
  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export const AppProvider = StateProvider;
export const AppConsumer = AppContext.Consumer;

export default AppContext;
