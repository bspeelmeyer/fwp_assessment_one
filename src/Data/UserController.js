
const USERS_KEY = "users";
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
const editUser = (user) => {
    const users = getUsers();
    for(let i = 0; i < users.length;i++){
        if(users[i].email === user.email){
            users[i] = user;
            setUsers(users);
        }
    }
}

// If email and password match, return true and set logged in user
// and redirect to home page. If no match found return false
const validateUser = (email, password) => {
    const users = getUsers();
    for( const user of users){
        if(email === user.email && password === user.password){
            setLoggedIn(user.email);
            return true;
        }
    }
    return false;
}

const getLoggedInUser = () => {
    const users = getUsers();
    const email = JSON.parse(localStorage.getItem(LOGGED_IN));
    for(const user of users){
        if(email === user.email){
            return user;
        }else{
            return null;
        }
    }
}



const deleteUser = (email) => {
    const users = getUsers();
    for(let i = 0; i < users.length; i++){
        if(email === users[i].email){
            users.splice(i,1);
            setUsers(users);
        }
    }
}

const removeLoggedInUser = () => {
    localStorage.removeItem(LOGGED_IN);
}

const getLoggedInEmail = () => {
  return  localStorage.getItem(LOGGED_IN);
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
    
    
}