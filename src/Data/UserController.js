// Controller handles all crud operations
// of users

// local storage users array key
const USERS_KEY = "users";

// local storage logged in user key
const LOGGED_IN = "loggedInUser";

// If user key does not exist 
// in localStorage then create it
const initArray = () => {
    if(localStorage.getItem(USERS_KEY) === null){
        var userArray = [];
        localStorage.setItem(USERS_KEY, JSON.stringify(userArray));
    }else{
        return;
    }
}

// return the array of users from localstorage
const getUsers = () => {
    return JSON.parse(localStorage.getItem(USERS_KEY));
}

// store the array of users in localstorage
const setUsers = (users) => {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
}


// get users array, then check if submitted emial
// already exists in array, if true return true
const checkEmail = (email) => {
    const users = getUsers();

    for(let i = 0; i < users.length; i++){
        if(email === users[i].email){
            return true;
        }
    }

    return false;
}

// Sets localstorage logged in user as user email
const setLoggedIn = (user) => {
    localStorage.setItem(LOGGED_IN, JSON.stringify(user));
}

// Insert new user to array in local storage
const insertUser = (user) => {
    const users = getUsers();

    users.push(user);

    setUsers(users);
}

// Edit existing user in localstoarge
const editUser = (updateUser, oldEmail) => {
    const users = getUsers();
    for(var i in users){
        if(users[i].email === oldEmail.oldEmail){
            setLoggedIn(updateUser.email);
            users[i] = updateUser;
            setUsers(users);
        }
    }
    
}

// If email and password match, return true and set logged in user
// and redirect to home page. If no match found return false
const validateUser = (email, password) => {
    const users = getUsers();
    for(const user of users){
        if(email === user.email && password === user.password){
            setLoggedIn(email);
            return true;
        }
    }
    return false;
}

// Function returns logged in user details
const getLoggedInUser = () => {
    const users = getUsers();
    const email = JSON.parse(localStorage.getItem(LOGGED_IN));
    for(const user of users){
        if(email === user.email){
            return user;
        };
    };
    return null;
}


// Function deletes user by their email
const deleteUser = (email) => {
    const users = getUsers();
    for(const user of users){
        if(email === user.email){
            users.splice(user,1);
            setUsers(users);
        }
    }
}

// Removes the user email from 
// the logged in user field in
// local storage
const removeLoggedInUser = () => {
    localStorage.removeItem(LOGGED_IN);
}

// Function returns the email of the logged
// in user
const getLoggedInEmail = () => {
  return  JSON.parse(localStorage.getItem(LOGGED_IN));
}

// Function gets the name of 
// user via their email
const getName = (email) => {
    const users = getUsers();
    for(const user of users){
        if(email === user.email){
            return user.name;
        }
        
        
    }
    return null;
}


export {
    initArray,
    getUsers,
    insertUser,
    validateUser,
    setUsers,
    checkEmail,
    getLoggedInUser,
    getLoggedInEmail,
    deleteUser,
    removeLoggedInUser,
    editUser,
    getName
    
    
}