import React from 'react';

const FailedSearch = (props) => {
    return (
        <div className="row center-align">
            <img 
                alt="Paper with magnifying glass" 
                src="images/paper_zoom.png" 
                style={{width: '20%'}}
            />

            <h4 style={{color: 'gray'}}>Could not find what you are looking for.</h4>
        </div>
    );
}

export default FailedSearch;