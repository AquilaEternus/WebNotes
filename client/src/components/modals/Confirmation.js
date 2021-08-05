import React from "react";

const Confirmation = (props) => {
    return (
      <React.Fragment>
        <div className={props.toggle ? "display-modal modal custom-modal": "hide-modal modal custom-modal"}>
          <div className="modal-content">
            <h4>{props.header}</h4>
            <p>{props.text}</p>
          </div>
          <div className="modal-footer">
            <button onClick={props.decline} className="modal-close btn-flat">
              Go Back
            </button>
            <button onClick={props.accept} className="modal-close btn-flat">
              Yes
            </button>
          </div>
        </div>
      </React.Fragment>
    );
}

export default Confirmation;