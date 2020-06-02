import React from 'react';
import Doggo from './Doggo';

export default function DoggoList({ doggos }) {
  const doggoList = doggos.map((doggo, index) => (
    <div className="column is-6" key={index}>
      <Doggo doggo={doggo} />
    </div>
  ));
  return (
    <div className="items columns is-multiline">
      {doggoList}
    </div>
  )
}