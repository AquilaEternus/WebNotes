import React, { useEffect, useState, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { usePrevious } from '../helper/customHooks';
import Loading from '../components/views/Loading';
import M from 'materialize-css/dist/js/materialize.min.js';
import UpdateProfilePicture from '../components/modals/UpdateProfilePicture';

const Dashboard = (props) => {
    const collapsible = useRef(null);
    const [togglePictureUpload, setTogglePictureUpload] = useState(false);
    const history = useHistory();
    const prevLoc = usePrevious(history.location.pathname);

    useEffect(() => {
        if (prevLoc !== history.location.pathname) {
            window.scrollTo(0,0);
        }
        M.Collapsible.init(collapsible.current, {
            accordian: false
        })
    })

    const daysSinceAccountCreated = () => {
        let currentDate = new Date();
        let creationDate = new Date(props.user.createdAt);
        let difference = currentDate.getTime() - creationDate.getTime();
        return (difference / (1000 * 3600 * 24)).toFixed(0);
    }

    const handleProfilePictureChange = () => {
        setTogglePictureUpload(!togglePictureUpload)
    }

    if (props.loading){
        return <React.Fragment>
            <Loading />
        </React.Fragment>
    }
    else if (!props.loading && props.user) {
        return (<div className="container main-container">
            <UpdateProfilePicture toggle={togglePictureUpload} 
                header="Update Avatar Picture" 
                decline={() => setTogglePictureUpload(!togglePictureUpload)}
                accept={handleProfilePictureChange}
            />
        <div className="row center-align">
            <div className="avatar">
                <img 
                    alt="Profile Avatar"
                    className="profile-picture" 
                    src={`${props.user.pfp_url}`} 
                />
            </div>
            <h3 className="header-color">{props.user.username}'s Dashboard</h3>
        </div>
        <div className="row center-align">
            <p><span style={{fontWeight: 'bold'}}>Email: </span> {props.user.email}</p>
            <p><span style={{fontWeight: 'bold'}}>Taking Notes Since: </span> {daysSinceAccountCreated() || 0} days ago</p>
        </div>
        <ul ref={collapsible} className="collapsible popout">
            <li className="active">
                <div className="collapsible-header"> <i className="small material-icons">book</i>MyNotes</div>
                <div className="collapsible-body">
                    <div className="row center-align">
                        <div className="col s12 l6">
                            <Link style={{width: '100%', margin: '1em auto'}} className="btn grey" to="/dashboard/mynotes">View MyNotes</Link>
                        </div>
                        <div className="col s12 l6">
                            <Link style={{width: '100%', margin: '1em auto'}} className="btn grey" to="/dashboard/addnote">Add Note</Link>
                        </div>          
                    </div>
                </div>
            </li>
            <li>
                <div className="collapsible-header"> <i className="small material-icons">face</i>Social</div>
                <div className="collapsible-body">
                    <div className="row center-align">
                        <div className="col s12 l6">
                            <Link style={{width: '100%', margin: '1em auto'}} className="btn grey" to="/dashboard/liked-notes">
                                Liked Notes
                            </Link>
                        </div>         
                    </div>
                </div>
            </li>
            <li>
                <div className="collapsible-header"> <i className="small material-icons">settings</i>Settings</div>
                <div className="collapsible-body">
                    <div className="row center-align">
                        <div className="col s12 l6">
                            <button 
                                style={{width: '100%', margin: '1em auto'}} 
                                className="btn grey"
                                onClick={() => setTogglePictureUpload(!togglePictureUpload)}
                            >
                                Update Profile Picture
                            </button>
                        </div>   
                        <div className="col s12 l6">
                            <button style={{width: '100%', margin: '1em auto'}} className="btn grey">
                                Change Email
                            </button>
                        </div> 
                        <div className="col s12 l6">
                            <Link style={{width: '100%', margin: '1em auto'}} className="btn grey" to="/dashboard/liked">
                                Change Password
                            </Link>
                        </div>     
                    </div>
                </div>
            </li>
        </ul>
        
    </div>);
    } else {
        return (null);
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        loading: state.auth.isLoading
    }
}

export default connect(mapStateToProps, null)(Dashboard);