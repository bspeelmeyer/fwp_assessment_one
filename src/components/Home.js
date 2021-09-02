import { props } from 'bluebird';
import { Link } from "react-router-dom";
import React from 'react';
import { deleteUser, getLoggedInUser, logout } from '../Data/UserSubmit';
import defaultProfileImg from '../images/default_profile.png';
import delete1 from '../images/delete1.png';
import edit from '../images/edit.png';

// This component returns the home page of the
// application, the content on this page is only accessible 
// for registered users

const Home = (props) => {

    const user = getLoggedInUser();

    const confirmDelete = () => {
        let result = window.confirm("Confirm to delete your account");
        const user = getLoggedInUser();
        if(result === true){
            deleteUser(user.email);
            logout();
            props.history.push("/");
        }
    }

    return (
        <div className="container bg-dark">
            <div className="row">
                <h2 className="text-white align-text-left">Profile</h2>
            </div>
            <div className="row">
                <div className="col-md-auto">
                    <img src={defaultProfileImg} alt="Profile pic"/>
                </div>
                <div className="col">
                    <h3 className="text-bold text-white">{user.name}</h3>
                    <h4 className="text-white">{user.email}</h4>
                </div>
                <div className="col">
                    <Link to='/editprofile'>
                        <img src={edit} alt="Edit"/>    
                    </Link>
                </div>
                <div className="col">
                    <img src={delete1} alt="Delete" onClick={() => confirmDelete()}/>    
                </div>
            </div>
            <div className="row">
                <h3 className="text-white">Joined date: {user.dateJoined}</h3>
            </div>
        </div>
        
    );
}

export default Home;