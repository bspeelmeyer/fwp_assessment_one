import '../App.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

import React, { useState } from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import Navigation from './Navigation';
import Header from './Header';
import Footer from './Footer';
import Home from './Home';
import Register from './Register';
import LandingPage from './LandingPage';
import Signin from './Signin';
import EditProfile from './EditProfile';
import Posts from './Posts';
import EditPosts from './EditPosts';
import { checkEmail, getLoggedInEmail, removeLoggedInUser } from '../Data/UserController';

function App() {
 
  const [email, setEmail] = useState(getLoggedInEmail());

  const loginUser = (email) => {
    setEmail(email);
  }

  const logout = () => {
    removeLoggedInUser();
    setEmail(null);
  }

  return (

    // Top level content container
    <div className="d-flex bg-dark flex-column min-vh-100">

      {/* Begin react router */}
      <Router>

        {/* Get header component */}
        <Header />

        {/* Get navbar component */}
        <Navigation email={email} logout={logout} />

        <main role="main">
          {/* Main content container */}
          <div className="container my-3">
            
            {/* Switch for react router */}
            <Switch>

              {/* Route for landing page of application */}
             <Route exact path="/" component={ LandingPage }/>

              {/* Route for the register page */}
             <Route path="/register" component={ Register }/>

             {/* Route for the signin page */}
             <Route path="/signin" render={props => (<Signin {...props} loginUser={loginUser}/>)}/>

             {/* Route for user home page */}
             <Route path="/home">
               <Home logout={logout}/>
             </Route>

             {/* Route for the edit profile page */}
             <Route path="/editprofile" component={ EditProfile }/>

             {/* Route for posts page */}
             <Route path="/posts" component={ Posts }/>

             {/* Route for edit post page */}
             <Route path="/:handle" component={ EditPosts }/>

             

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
