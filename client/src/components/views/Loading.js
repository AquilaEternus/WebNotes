import React, { useEffect } from 'react';

const Loading = (props) => {
    useEffect(() => {
        setTimeout(() => {

        }, 10000)
    }, []);
    return (
        <div className="row center-align">
            <div className="preloader-wrapper big active">
                <div className="spinner-layer spinner-blue-only">
                <div className="circle-clipper left">
                    <div className="circle"></div>
                </div><div className="gap-patch">
                    <div className="circle"></div>
                </div><div className="circle-clipper right">
                    <div className="circle"></div>
                </div>
                </div>
            </div>
        </div>
        
    );
}

export default Loading;