import React from 'react';
import Firebase from '../firebase';

const FirebaseContext = React.createContext(null);

const { Provider } = FirebaseContext;

export const firebase = new Firebase();

const StateProvider = ({ children }) => {
  return <Provider value={firebase}>{children}</Provider>;
};

export const FirebaseProvider = StateProvider;
export const FirebaseConsumer = FirebaseContext.Consumer;

export default FirebaseContext;