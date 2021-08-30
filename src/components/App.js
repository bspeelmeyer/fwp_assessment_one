import '../App.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

// import React, { useState } from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import Navigation from './Navigation';
import Header from './Header';
import Footer from './Footer';
// import Home from './Home';
import Register from './Register';
import LandingPage from './LandingPage';

function App() {
  return (

    // Top level content container
    <div className="d-flex bg-dark flex-column min-vh-100">

      {/* Begin react router */}
      <Router>

        {/* Get header component */}
        <Header />

        {/* Get navbar component */}
        <Navigation />

        <main role="main">
          {/* Main content container */}
          <div className="container my-3">
            
            {/* Switch for react router */}
            <Switch>

              {/* Route for home page of application */}
             <Route exact path="/" component={ LandingPage }/>

              {/* Route for the register page */}
             <Route path="/register" component={ Register }/>

            </Switch>

            {/* End of main content contatiner */}
          </div>
        </main>

        {/* Get footer component */}
        <Footer />

        {/* End react router */}
      </Router>

      {/* End top level content container */}
    </div>

  );
}

export default App;
