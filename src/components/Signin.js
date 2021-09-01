import React, { useState } from 'react';
import {validateUser} from '../Data/UserSubmit';

// This component returns and handles the
// sign of already registered users

const Signin = (props) => {
    
    const [fields, setFields] = useState({email: "", password: ""});
    const [errorMessage, setErrorMessage] = useState(null);

    const handleInputChange = (event) => {
        setFields({...fields, [event.target.name]: event.target.value});
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const verified = validateUser(fields.email, fields.password);

        if(verified === true){
            props.history.push("/home");
            return;
        }

        const temp = {...fields};
        temp.password = "";
        setFields(temp);

        setErrorMessage("Invaild credentials, please try agian");

    }
    
    return (
        <div class="container bg-dark">
            <form onSubmit={handleSubmit}>
                <div class="form-group">
                    <label class="text-white" htmlFor="email">Email address</label>
                    <input  class="form-control" id="email" name="email" placeholder="Enter email"
                        value={fields.email} onChange={handleInputChange}></input>
                </div>
            
                <div class="form-group">
                    <label class="text-white" htmlFor="password">Password</label>
                    <input type="password" class="form-control" name="password" id="password" placeholder="Enter password"
                        value={fields.password} onChange={handleInputChange}></input>
                </div>
                <div class="form-group">
                    <button type="submit" class="btn btn-primary">Submit</button>
                </div>
                <div className="form-group">
                    <span className="text-danger">{errorMessage}</span>
                </div>
            </form>
        </div>
        
    );
}

export default Signin;