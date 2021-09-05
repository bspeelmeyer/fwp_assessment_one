import React, { useEffect, useState} from 'react';
import { useLocation } from 'react-router-dom';
import { editPost, getPostById } from '../Data/PostController';
import { usePostValidation } from '../Hooks/usePostValidation';

const EditPosts = (props) => {
    
    // hook used for retriveal of object location
    const location = useLocation();
    const { userId } = location.state;
    let post = getPostById(userId);

    // sets fields to the post values that are to be edited
    useEffect(() => {
        setFields({post: post.post, id: post.id, postedBy: post.postedBy, name: post.name})
    },[post.id, post.name, post.post, post.postedBy])

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
           post = {...fields};
           editPost(post);
           alert("Post successfully edited");
           props.history.push("/posts");
        }
       
    }

    // Use custom hook to validate the form
    const hasPost = usePostValidation({
        post: fields.post
    })

   return (
        <div className="container bg-dark">
            <div className="row border-bottom">
                <h2 className="text-white text-center">Edit Post</h2>
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
                            {hasPost ? <button type="submit" class="btn btn-dark">Submit</button> : <button type="submit" class="btn btn-dark disabled">Submit</button>}
                        </div>
                    </form>
                </div>
                <div className="col"></div>
            </div>
        </div>
    )
}

export default EditPosts;