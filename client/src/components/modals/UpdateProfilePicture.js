import React, { useState } from "react";
import { connect } from 'react-redux';
import { updateProfilePicture } from '../../actions/authActions';

const UpdateProfilePicture = (props) => {
    const [selectedFile, setSelectedFile] = useState('');

    const changeHandler = (event) => {
    	setSelectedFile(event.target.files[0]);
    };

    const handleFileUpload = (e) => {
      e.preventDefault();
      const data = new FormData();
      data.append('profile-pic', selectedFile);
      props.updateProfilePicture(data);
    	props.accept();
    }

    return (
      <React.Fragment>
        <div className={props.toggle ? "display-modal modal custom-modal": "hide-modal modal custom-modal"}>
          <div className="modal-content">
            <h4>Change Profile Picture</h4>.
            <div className="row"></div>
              <div className="file-field input-field">
                <div className="btn">
                  <span>Image</span>
                  <input encType="multipart/form-data" type="file" name="profile-pic" onChange={changeHandler}/>
                </div>
                <div className="file-path-wrapper">
                  <input className="file-path validate" type="text"/>
                </div>
              </div>
          </div>
          <div className="modal-footer">
            <button onClick={props.decline} className="modal-close btn-flat">
              Go Back
            </button>
            <button onClick={handleFileUpload} className="modal-close btn-flat">
              Upload
            </button>
          </div>
        </div>
      </React.Fragment>
    );
}

export default connect(null, { updateProfilePicture })(UpdateProfilePicture);