import React from "react";
import { Link } from "react-router-dom";
// This Component returns the naviagtion Element
// of the application


const Navigation = (props) => {
 
  return (
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container ">
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item">
              <Link className="nav-link" to="/">Home</Link>
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
        </div>
      </div>
    </nav>
    );
}


export default Navigation;