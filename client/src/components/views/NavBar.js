import React from 'react';
import {
    Link,
    NavLink
} from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/authActions';

const NavBar = (props) => {
    const showLogin = (style = { color: 'white' }) => {
        if (props.isAuthenticated) {
            return <React.Fragment>
                <li>
                    <NavLink style={style} to="/dashboard">
                    <div className="nav-account-icon" style={{
                        maxHeight: '100%', 
                        height:'64px', 
                        overflow: 'hidden'
                    }} >
                            <img 
                                alt="Profile Avatar"
                                className="profile-picture-nav" 
                                src={`${props.user.pfp_url}`} 
                            />
                            <p style={{marginLeft: '1em'}}>{props.user.username}</p>
                        </div>
                    
                    </NavLink>
                </li>
                <li><NavLink onClick={props.logout} style={style} to="/"><i className="small material-icons left white-text">power_settings_new</i>Logout</NavLink></li>
            </React.Fragment>
        }
        return <React.Fragment>
            <li><NavLink style={style} to="/login">Log In</NavLink></li>
            <li><NavLink style={style} to="/signup">Sign Up</NavLink></li>
        </React.Fragment>
    }

    return (<div>
        <nav>
            <div className="nav-wrapper blue">
                <Link to="/" style={{ fontFamily: ['Lobster', 'cursive'], color: 'white' }} className="brand-logo">
                    WebNotes
                </Link>
                <a href={"#!"} data-target="mobile" className="sidenav-trigger"><i className="material-icons">menu</i></a>
                <ul className="right hide-on-med-and-down">
                    {/* <li><NavLink to="/about">About</NavLink></li> */}
                    {showLogin()}
                </ul>
            </div>
        </nav>

        <ul className="sidenav sidenav-close grey darken-3"  id="mobile">
            {/* <li><NavLink style={{ color: 'white' }} to="/">Home</NavLink></li> */}
            {/* <li><NavLink style={{ color: 'white' }} to="/about">About</NavLink></li> */}
            {showLogin()}
        </ul>
    </div>);
};

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        user: state.auth.user
    }
}

export default connect(mapStateToProps, { logout })(NavBar);