import React, { useEffect } from 'react';

const About = (props) => {
    useEffect(() => {
        window.scroll(0, 0);
    })
    return (<div className="container main-container">
        <h1>About</h1>
        <p>This page is currently under construction.</p>
    </div>);
}

export default About;