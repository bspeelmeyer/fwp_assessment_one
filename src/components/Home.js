import { Link, useHistory } from "react-router-dom";
import React from 'react';
import { deleteUser, getLoggedInUser } from '../Data/UserController';
import defaultProfileImg from '../images/default_profile.png';
import delete1 from '../images/delete1.png';
import edit from '../images/edit.png';
import { deletePostsByOwner } from '../Data/PostController';

// This component returns the home page of the
// application, the content on this page is only accessible 
// for registered users

const Home = (props) => {

    // Get the details of the current logged in user
    const user = getLoggedInUser();

    // Use history hook used to be able to navigate back to 
    // Landing page on user delete
    let history = useHistory();

    // function shows user confirmation window before deleting account
    const confirmDelete = () => {
        let result = window.confirm("Confirm to delete your account");
        // const user = getLoggedInUser();
        if(result === true){
            deleteUser(user.email);
            deletePostsByOwner(user.email);
            props.logout();
            history.push("/");
        }
       
    }

    return (
        <div className="container bg-dark">
            <div className="row border-bottom">
                <h2 className="text-white text-center">Profile</h2>
            </div>
            <div className="row">
                <div className="col"></div>
                <div className="col-6">
                    <div className="row justify-content-center border-bottom">
                        <div className="col-3 my-auto">
                            <img src={defaultProfileImg} alt="Profile pic"/>
                        </div>
                        <div className="col-7 my-auto">
                            <h2 className="text-bold text-white">{user.name}</h2>
                            <h4 className="text-white">{user.email}</h4>                        
                        </div>
                        <div className="col-1 my-auto">
                            <Link to='/editprofile'>
                                <img src={edit} alt="Edit"/>    
                            </Link>
                        </div>
                        <div className="col-1 my-auto">
                            <img src={delete1} alt="Delete" onClick={() => confirmDelete()}/>                          
                        </div>
                    </div>
                    <div className="row">
                        <h4 className="text-white py-2">Joined date: {user.dateJoined}</h4>
                    </div>
                </div>
                <div className="col"></div>
            </div>
        </div>
        
    );
}

export default Home;