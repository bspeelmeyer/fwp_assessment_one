import { getLoggedInUser } from "./UserController";
// Controller handles crud operations for posts

// local Storage key
const POSTS = "posts";


//If posts key does not exist
// in local storage then create it
const initPostArray = () => {
    if(localStorage.getItem(POSTS) === null){
        var postsArray = [];
        localStorage.setItem(POSTS, JSON.stringify(postsArray));
    }else{
        return;
    }
}

// Return the array of posts from local storage
const getPosts = () => {
    return JSON.parse(localStorage.getItem(POSTS));
}

// Store the array of posts in local storage
const setPosts = (posts) => {
    localStorage.setItem(POSTS, JSON.stringify(posts));
}

// Insert new post to array in local storage
const insertPost = (post) => {
    const posts = getPosts();
    post.id = getPostId(posts);
    post.postedBy = JSON.parse(localStorage.getItem("loggedInUser"));
    const user = getLoggedInUser(post.postedBy);
    post.name = user.name;
    posts.push(post);
    setPosts(posts);
}

// Get the highest post id add one to it and return the value
const getPostId = (posts) => {
    let max = posts.reduce((acc, post) => acc = acc > post.id ? acc : post.id, 0);
    max = max + 1;
    return max;
}

// Edit existing post in local storage
const editPost = (post) => {
    const posts = getPosts();
    for(let i = 0; i < posts.length;i++){
        if(posts[i].id === post.id){
            posts[i] = post;
            setPosts(posts);
        }
    }
}

// Function updates all post user has made to their
// new email address under the post owner field
const updatePostOwner = (newEmail,OldEmail) => {
    const posts = getPosts();
    for(let i = 0; i < posts.length;i++){
        if(posts[i].postedBy === OldEmail){
            posts[i].postedBy = newEmail;
        }
    }
    setPosts(posts);
}

// Function deletes all posts user owns
// when user deletes their account
const deletePostsByOwner = (email) => {
    const posts = getPosts();
    for(let i = 0; i < posts.length;i++){
        if(posts[i].postedBy === email){
            deletePost(posts[i].id);
        }
    }
}

// Delete post by id
const deletePost = (id) => {
    const posts = getPosts();
    for(let i = 0; i < posts.length;i++){
        if(posts[i].id === id){
            posts.splice(i,1);
            setPosts(posts);
        }
    }
}

// Return post of given id
const getPostById = (id) => {
    const posts = getPosts();
    for(let i = 0; i < posts.length;i++){
        if(posts[i].id === id){
            return posts[i];
        }
    }
}

export {
    initPostArray,
    insertPost,
    editPost,
    deletePost,
    getPosts,
    getPostById,
    updatePostOwner,
    deletePostsByOwner
}