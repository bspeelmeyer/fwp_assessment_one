import React, {useState, } from 'react';
import { initPostArray, insertPost, deletePost, getPosts } from '../Data/PostController';
import { usePostValidation } from '../Hooks/usePostValidation';
import delete1 from '../images/delete1.png';
import edit from '../images/edit.png';
import { Link } from "react-router-dom";


const Posts = (props) => {

    // Initialize post array
    initPostArray();

    var updatePosts = getPosts();

    // Configure fields for state tracking
    const [fields, setFields] = useState({post: "", id: "", postedBy: "", name: ""});

    // Basic change handler
    const handleInputChange = (event) => {
        setFields({...fields, [event.target.name]: event.target.value});
    }

    // Handler for form submit
    const handleSubmit = (event) => {
        // Prevent redirect on form submit
        event.preventDefault();

       

        // Check if post meets requirments
        if(hasPost){
            const post = {...fields};
            insertPost(post);
            const temp = {...fields};
            temp.post = "";
            setFields(temp);
            updatePosts = getPosts();
        }
       
    }

    // Check to see if the post is owned by 
    // the person that is logged in
    const ownPost = (email) => {
        const loggedin = JSON.parse(localStorage.getItem("loggedInUser"));
        if(loggedin === email){
            return true;
        }else{
            return false;
        }
    }

    // Use custom hook to validate the form
    const hasPost = usePostValidation({
        post: fields.post
    })

   
    // Confirm deletion of the post
    const confirmDelete = (id) => {
        let result = window.confirm("Confirm to delete your post");
        if(result === true){
            deletePost(id);
            const temp = {...fields};
            temp.post = "";
            setFields(temp);
            updatePosts = getPosts();
        }
    }

    return (
        <div className="container bg-dark">
            <div className="row">
            <form onSubmit={handleSubmit}>
                <div class="form-group">
                    <label class="text-white" htmlFor="post">What on your mind?</label>
                    <input type="text" class="form-control" name="post" id="post" placeholder="Share your thoughts..."
                        value={fields.post} onChange={handleInputChange}></input>
                </div>
                <div class="form-group">
                    {hasPost ? <button type="submit" class="btn btn-primary">Submit</button> : <button type="submit" class="btn btn-primary disabled">Submit</button>}
                </div>
            </form>
            </div>
            {updatePosts.map(function(u, idx){
                return(
                    <div className="row">
                        <div className="container">
                            <h4 className="text-white" key={idx}>{u.name}</h4>
                            <p className="text-white" key={idx}>{u.post}</p>
                            {ownPost(u.postedBy) ?    <Link to={{pathname: '/editposts', state: {userId: u.id},}}><img src={edit} alt="Edit"/></Link>: null}
                            {ownPost(u.postedBy) ?  <img src={delete1} alt="Delete" onClick={() => confirmDelete(u.id)}/>  : null}
                        </div>
                    </div>
                )
            })}
        </div>
    );
}

export default Posts;