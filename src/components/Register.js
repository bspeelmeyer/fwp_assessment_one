import React, { useState } from 'react';
import { useValidateForm } from '../Hooks/useValidateForm';
import { checkEmail, insertUser, initArray } from '../Data/UserController';
// This component returns and handles the registration
// of a new user


const Register = (props) => {

    // Initiate user storage in 
    // local storage
    initArray();

    // Configure fields for state tracking
    const [fields, setFields] = useState({name: "", email: "", password: "", confirmPassword: "", dateJoined: ""});

    // Use customer hook to validate the form
    const [validLength, hasNumber, upperCase, lowerCase, match, specialChar, validEmail, hasName
    ] = useValidateForm({
        firstPassword: fields.password,
        secondPassword: fields.confirmPassword,
        email: fields.email,
        name: fields.name
    });

    // Basic change handler
    const handleInputChange = (event) => {
        setFields({...fields, [event.target.name]: event.target.value});
       
    }

    // Handler for form submit event
    const handleSubmit = (event) => {
        
        // Prvent redirect on form submit
        event.preventDefault();
        
        // Check if all validation methods return true
        if(validLength && hasNumber && upperCase && lowerCase && match && specialChar && validEmail && hasName){
            
            // Check if email already exists
            if(checkEmail(fields.email) === true){
                alert("Email is already taken");
                
            }else{
                // Date adn set joined date field
                var today = new Date();
                var dd = String(today.getDate()).padStart(2, '0');
                var mm = String(today.getMonth() + 1).padStart(2, '0');
                var yyyy = today.getFullYear();
                today = dd + '/' + mm + '/' + yyyy;

                fields.dateJoined = today;

                // Copy field values to user object
                const user = {...fields};
                
                // Call function to add user object
                // to local storage
                insertUser(user);
                props.history.push("/signin");
            }
            
        }else{

            // If validation returns atleast 
            // one false value alert user
            alert("please check form");
        }
        
    }

    
    

    return (
    <div class="container bg-dark ">
        <form onSubmit={handleSubmit}>
        <div class="form-group">
                <label class="text-white" htmlFor="name">Name</label>
                <input  class="form-control" id="name" name="name"  placeholder="Enter name"
                    value={fields.name} onChange={handleInputChange}></input>
            </div>
            {hasName ? null : <p class="text-danger">Field must not be empty</p>}
            <div class="form-group">
                <label class="text-white" htmlFor="email">Email address</label>
                <input  class="form-control" id="email" name="email" placeholder="Enter email"
                    value={fields.email} onChange={handleInputChange}></input>
            </div>
            {validEmail ? null : <p class="text-danger">Must be valid email address</p>}
            <div class="form-group">
                <label class="text-white" htmlFor="password">Password</label>
                <input type="password" class="form-control" name="password" id="password" placeholder="Enter password"
                    value={fields.password} onChange={handleInputChange}></input>
            </div>
            <div class="form-group">
                <label class="text-white" htmlFor="confirmPassword">Password</label>
                <input type="password" class="form-control" name="confirmPassword" id="confirmPassword" placeholder="Confirm password"
                    value={fields.confirmPassword} onChange={handleInputChange}></input>
            </div>
            <div class="form-group">
                <div class="row">
                    <div class="col">
                        <ul>
                            <li>
                                {validLength ? <p class="text-center text-success">Password must be atleast 8 characters</p> : <p class="text-center text-danger">Password must be atleast 8 characters</p>}
                            </li>
                            <li>
                                {upperCase ? <p class="text-center text-success">Password must contain atleast one upper case character</p> : <p class="text-center text-danger">Password must contain atleast one upper case character</p>}
                            </li>
                            <li>
                                {specialChar ? <p class="text-center text-success">Password must contain atleast one special character</p> : <p class="text-center text-danger">Password must contain atleast one special character</p>}
                            </li>
                        </ul>
                    </div>
                    <div class="col">
                        <ul>
                            <li>
                                {hasNumber ? <p class="text-center text-success">Password must contain atleast one number</p> : <p class="text-center text-danger">Password must contain atleast one number</p>}
                            </li>
                            <li>
                                {lowerCase ? <p class="text-center text-success">Password must contain atleast one lower case character</p> : <p class="text-center text-danger">Password must contain atleast one lower case character</p>}
                            </li>
                            <li>
                                {match ? <p class="text-center text-success">Passwords must match</p> : <p class="text-center text-danger">Passwords must match</p>}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <button type="submit" class="btn btn-primary">Submit</button>
            </div>
        </form>
    </div>
    );
}

export default Register;