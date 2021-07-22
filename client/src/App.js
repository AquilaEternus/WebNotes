import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import './App.css';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';

import { connect } from 'react-redux';
import { loadUser } from './actions/authActions';

import Footer from './components/views/Footer';
import NavBar from './components/views/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute'
import {
  AddNote,
  About,
  Dashboard,
  EditNote,
  HomeNotes,
  LikedComments,
  LikedNotes,
  Login,
  UserNotes,
  ViewNote,
  Signup,
  PageNotFound
} from './views';


function App(props) {
  useEffect(() => {
    props.loadUser();
    M.AutoInit();
  }, [props]);

  return (
    <Router>
      <div className="App">
        <NavBar />
        <Switch>
          <Route path="/about" component={About} />
          <ProtectedRoute path='/dashboard/addnote' component={AddNote} />
          <ProtectedRoute path='/dashboard/mynotes/edit/:note_id' component={EditNote} />
          <Route path='/dashboard/mynotes' component={UserNotes} /> 
          <Route path='/dashboard/liked-notes' component={LikedNotes} />
          <ProtectedRoute exact path='/dashboard' component={Dashboard} />
          <Route path='/login' component={Login} />
          <Route path='/signup' component={Signup} />
          <Route path='/note/:note_id' component={ViewNote} />
          <Route exact path="/" component={HomeNotes} />
          <Route component={PageNotFound} />
        </Switch>
        <Footer />
      </div>
    </Router>

  );
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated
  }
}

export default connect(mapStateToProps, { loadUser })(App);
