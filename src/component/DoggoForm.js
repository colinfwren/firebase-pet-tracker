import React, { useState } from 'react';
import { addDoggo } from '../action';

function useFormStateChange(closeModal){
  const initialState = {
    name: '',
    dob: '',
    tailWaggability: 0,
  };
  const [formState, setFormState] = useState(initialState);
  function handleChange(event) {
    return setFormState({
      ...formState,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  }
  function clearForm(event) {
    event.preventDefault();
    setFormState(initialState);
    return closeModal();
  }
  return [formState, handleChange, clearForm];
}

export default function DoggoForm({ dispatch, onClose }) {
  const [formState, handleChange, clearForm] = useFormStateChange(onClose);
  return (
    <form>
      <div className="content is-large">
        <h1 className="is-large">Add a Doggo</h1>
        <p>Use the form below to add your doggo to the list. There's no input for how good they are as they're all good boys Brent.</p>
      </div>
      <div className="field">
        <label className="label">Who's a good boy/girl?</label>
        <div className="control">
          <input type="text" className="input is-large" name="name" placeholder="Pet's name" onChange={handleChange} value={formState.name} />
        </div>
      </div>
      <div className="field">
        <label className="label">When did your life become 8 millions times more awesome?</label>
        <div className="control">
          <input type="date" className="input is-large" name="dob" onChange={handleChange} value={formState.dob} />
        </div>
      </div>
      <div className="field">
        <label className="label">How likely if your doggo to take off while wagging?</label>
        <div className="control">
          <input type="range" className="input is-large" name="tailWaggability" onChange={handleChange} value={formState.tailWaggability} min="0" max="10" />
        </div>
      </div>
      <div className="field is-grouped">
        <div className="control">
            <button className="button is-link" onClick={(event) => {
              event.preventDefault();
              addDoggo(formState, dispatch);
              clearForm(event);
            }}>Submit</button>
        </div>
        <div className="control">
          <button onClick={clearForm} className="button is-link is-light">Clear</button>
        </div>
      </div>
    </form>
  );
}