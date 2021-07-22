import React from 'react';

const PageNotFound = () => {
    return (
        <div className="container main-container">
            <div className="row"></div>
            <div className="row"></div>
            <div className="row center-align">
                <h1 className="blue-text" style={{fontFamily: 'Lobster'}}>404</h1>
                <h3 className="grey-text">The requested page does not exist.</h3>
            </div>
        </div>
    )
} 

export default PageNotFound;