import React, { useState, useEffect } from 'react';
import {
    Link, useHistory
} from 'react-router-dom';
import { connect } from 'react-redux';
import ErrorBanner from '../components/error/ErrorBanner';
import { login } from '../actions/authActions';
import { usePrevious } from '../helper/customHooks';
import { clearErrors } from '../actions/errorActions';


const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState(null);
    const prevError = usePrevious(props.error);
    const history = useHistory();
    const prevLoc = usePrevious(history.location.pathname);

    useEffect(() => {
        if (prevError !== props.error) {
            if (props.error.id === 'LOGIN_FAIL') {
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
            history.push('/dashboard')
        }
    }, [prevError, props, prevLoc, history]);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        props.login({ email, password });
    }

    return (<div className="container main-container">
        <div className="row">
            <div className="col m3"></div>
            <form onSubmit={handleSubmit} className="col s12 m6 login-register-form">
                <div className="row center-align">
                    <h4 className="grey-text text-darken-4">Account Login</h4>
                </div>
                <ErrorBanner msg={msg} />
                <div className="row">
                    <div className="col m1"></div>
                    <div className="input-field col m10 s12">
                        <input id="email" type="email" name="email" style={{color: '#212121'}} className="validate" value={email} onChange={handleEmailChange} />
                        <label htmlFor="email">Email</label>
                        <span className="helper-text" data-error="wrong"></span>
                    </div>
                    <div className="col m1"></div>
                </div>
                <div className="row">
                    <div className="col m1"></div>
                    <div className="input-field col m10 s12">
                        <input id="password" type="password" name="password" className="validate" value={password} onChange={handlePasswordChange} />
                        <label htmlFor="password">Password</label>
                        <span className="helper-text" data-error="wrong"></span>
                    </div>
                    <div className="col m1"></div>
                </div>
                <div className="row">
                    <div className="col s2 m3"></div>
                    <button className="col s8 m6 btn waves-effect waves-light blue" type="submit">Login</button>
                    <div className="col s2 m3"></div>
                </div>
                <div className="row center-align">
                    <Link className="col s6 m6 left" to="/signup">Need an account? Click here.</Link>
                    <Link className="col s6 m6 right" to="/resetpassword">Forgot Password?</Link>
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

export default connect(mapStateToProps, { login, clearErrors })(Login);