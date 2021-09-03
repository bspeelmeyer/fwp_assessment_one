import React, { useEffect, useState} from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { editPost, getPostById } from '../Data/PostController';
import { usePostValidation } from '../Hooks/usePostValidation';

const EditPosts = (props) => {
    
    const location = useLocation();
    const { userId } = location.state;
    let post = getPostById(userId);

    useEffect(() => {
        setFields({post: post.post, id: post.id, postedBy: post.postedBy, name: post.name})
    },[])

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
    )
}

export default EditPosts;