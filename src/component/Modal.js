import React, { cloneElement } from 'react';

export default function Modal({ children, onClose }) {
  return (
    <div className="modal is-active">
      <div className="modal-background" onClick={onClose}></div>
        <div className="modal-content box">
          {cloneElement(children, { onClose})}
        </div>
        <button className="modal-close is-large" aria-label="close" onClick={onClose}></button>
    </div>
  )
}