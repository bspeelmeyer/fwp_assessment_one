import React, {useState, } from 'react';
import { initPostArray, insertPost, deletePost, getPosts } from '../Data/PostController';
import { usePostValidation } from '../Hooks/usePostValidation';
import delete1 from '../images/delete1.png';
import edit from '../images/edit.png';
import { Link } from "react-router-dom";


const Posts = (props) => {

    // Initialize post array
    initPostArray();

    // Allows the posts to be updated from localstorage
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

    // Use custom hook to validate the post field
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
            <div className="row border-bottom">
                <h2 className="text-white text-center">Posts</h2>
            </div>
            <div className="row">
                <div className="col"></div>
                <div className="col-6 py-2">
                    <form onSubmit={handleSubmit}>
                        <div class="form-group">
                            <label class="text-white" htmlFor="post">What on your mind?</label>
                            <input type="text" class="form-control" name="post" id="post" placeholder="Share your thoughts..."
                                value={fields.post} onChange={handleInputChange}></input>
                        </div>
                        <div class="form-group py-2 border-bottom">
                            {/* disable button, unless text is present in input */}
                            {hasPost ? <button type="submit" class="btn btn-dark">Submit</button> : <button type="submit" class="btn btn-dark disabled">Submit</button>}
                        </div>
                    </form>
                </div>
                <div className="col"></div>
            </div>
            {updatePosts.map(function(u, idx){
                return(
                    
                    <div className="row py-2">
                        <div className="row py-2 border border-bottom-0">
                            <h4 className="text-white border-bottom pb-2" key={idx}>{u.name}</h4>
                        </div>

                        {/* Renders boarder differently dependant on ownership of post */}
                        {ownPost(u.postedBy) ? <div className="row border border-top-0 border-bottom-0"> ?
                                                    <p className="text-white text-break" key={idx}>{u.post}</p>
                                                </div> 
                                                :
                                                <div className="row border border-top-0"> 
                                                    <p className="text-white text-break" key={idx}>{u.post}</p>
                                                </div> }

                        {/* Renders edit and delete buttons, dependant on ownership of posts */}
                        {ownPost(u.postedBy) ? 
                        <div className="row border border-top-0">
                            <div className="col-10 border-top"></div>
                            <div className="col-1 border-top py-2">
                                <Link to={{pathname: '/editposts', state: {userId: u.id},}}><img className="float-right"src={edit} alt="Edit"/></Link>
                            </div>
                            <div className="col-1 border-top py-2">
                                <img  src={delete1} alt="Delete" onClick={() => confirmDelete(u.id)}/>  
                            </div>
                        </div>
                        : null}
                    </div>
                )
            })}
        </div>
    );
}

export default Posts;