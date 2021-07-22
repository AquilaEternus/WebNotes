import React from 'react';

const ErrorBanner = (props) => {
    return (
        <div className={props.msg ? "error-banner show" : "error-banner"}>
            {props.msg ? props.msg : null}
        </div>
    );
}

export default ErrorBanner;