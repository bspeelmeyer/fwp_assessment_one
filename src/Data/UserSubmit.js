const USERS_KEY = "users";

const initUsers = () => {
    if(localStorage.getItem(USERS_KEY) !== null){
        return;
    }else{
        setUsers({});
    }
}

const getUsers = () => {
    return JSON.parse(localStorage.getItem(USERS_KEY));
}

const setUsers = (users) => {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
}


const insertOrUpdateUser = (user) => {
    const users = getUsers();

    users[user.id] = user;

    setUsers(users);
}

export {
    initUsers,
    getUsers,
    insertOrUpdateUser
}