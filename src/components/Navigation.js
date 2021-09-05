import React from "react";
import { Link } from "react-router-dom";


// This Component returns the naviagtion Element
// of the application

const Navigation = (props) => {
 
  return (
   
    <div class="container border-bottom">
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <Link className="navbar-brand" to="/">Home</Link>
          </li>
        </ul>
        <ul class="navbar-nav ms-auto">
          { props.email != null ? 
            <React.Fragment>
              <li class="nav-item">
                <Link className="nav-link" to="/posts">Posts</Link>
              </li>
              <li class="nav-item">
                <Link className="nav-link" to="/home">Profile</Link>
              </li>
              <li class="nav-item">
                <Link className="nav-link" to="/signin" onClick={props.logout}>Logout</Link>
              </li>
            </React.Fragment>
            :   
            <React.Fragment>
              <li class="nav-item">
                <Link className="nav-link" to="/signin">Sign in</Link>
              </li>
              <li class="nav-item">
                <Link className="nav-link" to="/register">Register</Link>
              </li>
            </React.Fragment>
          }
        </ul>
      </nav>
    </div>

    
   
    );
}


export default Navigation;