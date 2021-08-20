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
    <div className="d-flex bg-dark flex-column min-vh-100">
      <Router>
        <Header />
        <Navigation />
        <main role="main">
          <div className="container my-3">
            
            <Switch>
             <Route exact path="/" component={ LandingPage }/>
             <Route path="/register" component={ Register }/>
            </Switch>
          </div>
        </main>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
