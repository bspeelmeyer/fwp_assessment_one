import React from "react";
import { Link } from "react-router-dom";
// The navigation fu

const Navigation = () => {
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
            <li class="nav-item">
              <Link className="nav-link" to="/signin">Sign in</Link>
            </li>
            <li class="nav-item">
              <Link className="nav-link" to="/register">Register</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    );
}


export default Navigation;