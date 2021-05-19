const userModel = require("../sqlite_users").userModel;


const getUserByUsernameAndPassword = (username, password) => {
    let user = userModel.get_user(username); // gives a statement ->
    //{ USR_username: 'a', USR_name: 'Alex', USR_passwords: 'a' }
    if (user) {
        if (isUserValid(user, password)) {
            return user;
        }
    }
    return null;
};
const getUserById = (id) => {
    let username = userModel.findById(id);
    let user = userModel.get_user(username);
    if (user) {
        return user;
    }
    return null;
};

function isUserValid(user, password) {
    return user.USR_passwords === password;
}

const getGoogleUserById = (id, displayName, name) => {
    let user = userModel.findOrAddGoogleUser(id, displayName, name);
    if (user) {
        return user;
    } else {
        return null;
    }
};

module.exports = {
    getUserByUsernameAndPassword,
    getUserById,
    getGoogleUserById,
};
