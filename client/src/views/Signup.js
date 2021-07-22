import React, { useState, useEffect } from 'react';
import {
    Link, useHistory
} from 'react-router-dom';
import { connect } from 'react-redux';
import ErrorBanner from '../components/error/ErrorBanner';
import { register } from '../actions/authActions';
import { usePrevious } from '../helper/customHooks';
import { clearErrors } from '../actions/errorActions';

const Signup = (props) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');
    const [msg, setMsg] = useState(null);
    const prevError = usePrevious(props.error);
    const history = useHistory();
    const prevLoc = usePrevious(history.location.pathname);

    useEffect(() => {
        if (prevError !== props.error) {
            if (props.error.id === 'REGISTER_FAIL') {
                setMsg(props.error.msg.msg)
            } else {
                setMsg(null);
            }
        }
        if (prevLoc !== history.location.pathname) {
            setMsg(null);
            props.clearErrors();
        }

        if (props.isAuthenticated) {
            history.push('/')
        }
    }, [prevError, props, prevLoc, history]);

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handleConfPasswordChange = (e) => {
        setConfPassword(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const newUser = {
            username,
            email,
            password
        };
        props.register(newUser);
    }

    return (<div className="container main-container">
        <div className="row">
            <div className="col m3"></div>
            <form onSubmit={handleSubmit} className="col s12 m6 login-register-form">
                <div className="row center-align">
                    <h4>Register With Us</h4>
                </div>
                {/* <div className={msg ? "error-banner show" : "error-banner"}>{msg ? msg : null}</div> */}
                <ErrorBanner msg={msg} />
                <div className="row">
                    <div className="col m1"></div>
                    <div className="input-field col m10 s12">
                        <input id="username" type="text" className="validate" value={username} onChange={handleUsernameChange} />
                        <label htmlFor="username">Username</label>
                        <span className="helper-text" data-error="wrong"></span>
                    </div>
                    <div className="col m1"></div>
                </div>
                <div className="row">
                    <div className="col m1"></div>
                    <div className="input-field col m10 s12">
                        <input id="email" type="email" className="validate" value={email} onChange={handleEmailChange} />
                        <label htmlFor="email">Email</label>
                        <span className="helper-text" data-error="wrong"></span>
                    </div>
                    <div className="col m1"></div>
                </div>
                <div className="row">
                    <div className="col m1"></div>
                    <div className="input-field col m10 s12">
                        <input id="password" type="password" className="validate" value={password} onChange={handlePasswordChange} />
                        <label htmlFor="password">Password</label>
                        <span className="helper-text" data-error="wrong"></span>
                    </div>
                    <div className="col m1"></div>
                </div>
                <div className="row">
                    <div className="col m1"></div>
                    <div className="input-field col m10 s12">
                        <input id="confirm-password" type="password" className="validate" value={confPassword} onChange={handleConfPasswordChange} />
                        <label htmlFor="password">Confirm Password</label>
                        <span className="helper-text" data-error="wrong"></span>
                    </div>
                    <div className="col m1"></div>
                </div>
                <div className="row">
                    <div className="col s2 m3"></div>
                    <button className="col s8 m6 btn waves-effect waves-light blue" type="submit">Create Account</button>
                    <div className="col s2 m3"></div>
                </div>
                <div className="row center-align">
                    <div className="col s3"></div>
                    <Link className="col s6 m6 left" to="/login">Already registered? Login here.</Link>
                    <div className="col s3"></div>
                </div>
            </form>
            <div className="col m3"></div>
        </div>
    </div>);
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        error: state.error
    }
}

export default connect(mapStateToProps, { register, clearErrors })(Signup);