import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const ProtectedRoute = ({
  path,
  component: Component,
  render,
  isAuthenticated,
  user,
  ...rest
}) => {
  return (
    <Route
      path={path}
      {...rest}
      render={(props) => {
        if (isAuthenticated && user) {
          return Component ? <Component {...props} /> : render(props);
        }
        return (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        );
      }}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    isAuthenticated: state.auth.isAuthenticated
  };
};

export default connect(mapStateToProps)(ProtectedRoute);