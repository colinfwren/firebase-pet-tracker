import React, { useContext, useState, useEffect } from 'react';
import AppContext from './context/AppContext';
import FirebaseContext from './context/FirebaseContext';
import DoggoForm from './component/DoggoForm';
import DoggoList from './component/DoggoList';
import Modal from './component/Modal';

function App() {
  const [showModal, setShowModal] = useState(false);
  const context = useContext(AppContext);
  const { doLoginWithGoogle } = useContext(FirebaseContext);
  const { state, dispatch } = context;
  const { doggos, user } = state;
  const form = showModal ? (
    <Modal onClose={() => setShowModal(false)}>
      <DoggoForm dispatch={dispatch} />
    </Modal>
  ) : null;
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('data'));
    dispatch({ type: 'load_data', payload: { data }});
  }, []);
  const loginButton = !user.authenticated ? (
    <button onClick={() => doLoginWithGoogle(dispatch) } className="button is-link is-inverted is-outlined is-large">Login to backup data.</button>
  ) : (
    <p>Logged in as {user.name}</p>
  );
  const noDoggos = (
    <p>Oh Noes there's no Doggos!</p>
  );

  const doggoList = doggos.length > 0 ? (
    <DoggoList doggos={doggos} />
  ) : noDoggos;
  return (
    <main>
      {form}
      <section className="hero is-large">
        <div className="hero-body is-gradient">
          <div className="container content is-large">
            <h1 className="title">
              Firebase &amp; React Doggo Tracker
            </h1>
            <p className="subtitle">
              Demo app showing how to use Firebase in React. This app stores it's state in localStorage, with optional Cloud Firestore backup for logged in users.
            </p>
            {loginButton}
          </div>
        </div>
      </section>
      <div className="section">
        <div className="container">
          <div className="level">
            <div className="level-left">
              <div className="level-item">
                <h2 className="title">Doggos</h2>
              </div>
            </div>
            <div className="level-right">
              <div className="level-item">
                <button className="button is-primary is-large" onClick={() => setShowModal(true) }>Add Doggo</button>
              </div>
            </div>
          </div>
          {doggoList}
        </div>
      </div>
    </main>
  );
}

export default App;
