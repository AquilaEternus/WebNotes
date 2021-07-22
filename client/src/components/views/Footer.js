import React from 'react';
import { Link } from 'react-router-dom';

const Footer = (props) => {
    return (
    <React.Fragment>
         <footer className="page-footer blue">
          <div className="container">
            <div className="row">
              <div className="col l6 s12">
                <Link to="/about"><h5 className="grey-text text-lighten-4">About WebNotes</h5></Link>
              </div>
              <div className="col l4 offset-l2 s12">
                <h5 className="white-text">Social Media</h5>
                <ul style={{display: 'inline-block'}}>
                  <li>
                      <Link className="grey-text text-lighten-3" to="/">
                      <i className="fa fa-facebook-official fa-3x" aria-hidden="true"></i>
                      </Link>
                  </li>
                  <li>
                      <Link className="grey-text text-lighten-3" to="/">
                        <i className="fa fa-twitter-square fa-3x" aria-hidden="true"></i>
                      </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="footer-copyright">
            <div className="container center-align">
            © 2021 Jose Hernandez
            </div>
          </div>
        </footer>
    </React.Fragment>)
}

export default Footer;