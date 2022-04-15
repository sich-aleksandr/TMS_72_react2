import React from "react";
import "./modal.modules.css";

export const DisplayModal = ({ modalCloseHandler }) => {
  return (
    <div className="modal-container">
      <div className="modal">
        <button className="btn-close" onClick={() => modalCloseHandler()}>
          X
        </button>
        <div className="title">With a portal, we can render</div>
        <span className="text">This is being rendered inside</span>
      </div>
    </div>
  );
};
