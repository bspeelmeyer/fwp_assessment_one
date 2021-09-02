import React, {useState, } from 'react';
import { propTypes } from 'react-bootstrap/esm/Image';
import { initPostArray, insertPost, editPost, deletePost } from '../Data/PostController';
import { usePostValidation } from '../Hooks/usePostValidation';

const Posts = (props) => {

     // Initialize post array
     initPostArray();

    // Configure fields for state tracking
    const [fields, setFields] = useState({post: "", id: "", postedBy: ""});

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
        }
       
    }

    // Use custom hook to validate the form
    const hasPost = usePostValidation({
        post: fields.post
    })

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
            
        </div>
    );
}

export default Posts;