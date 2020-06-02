import React, { useContext } from 'react';
import AppContext from '../context/AppContext';
import { removeDoggo } from '../action';
 
export default function Doggo({ doggo }) {
  const context = useContext(AppContext);
  const { dispatch } = context;
  return (
    <div className="card">
      <header className="card-header">
        <p className="card-header-title">{doggo.name}</p>
      </header> 
      <div className="card-content">
        <div className="content">
          <p>Date of Birth: <time dateTime={doggo.dob}>{doggo.dob}</time></p>
          <p>Tail Waggability: {doggo.tailWaggability}</p>
        </div>
      </div>
      <footer className="card-footer">
        <button onClick={() => removeDoggo(doggo.name, dispatch) } className="card-footer-item button is-danger is-inverted">Delete</button>
      </footer>
    </div>
  )
}