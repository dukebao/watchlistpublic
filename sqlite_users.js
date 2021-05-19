const { copyFileSync } = require('fs');

const userModel = {

    findById: (user_id) => {
        const db = require('better-sqlite3')('./database/anime_watchlist.db');

        try {
            let statement = db.prepare(`SELECT * FROM users WHERE USR_ID = ?`).get(user_id);
            return statement.USR_username;
        } catch (TypeError) {
            return null;
        }
    },

    add_user: (user_id, user_name, user_username, user_password) => {
        const db = require('better-sqlite3')('./database/anime_watchlist.db');
        let insert = db.prepare(`INSERT INTO users (USR_ID, USR_name, USR_username, USR_passwords) VALUES(?, ?, ?, ?)`);
        insert.run(user_id, user_name, user_username, user_password);
        db.close();
    },

    list_users: () => {
        const db = require('better-sqlite3')('./database/anime_watchlist.db');
        let statement = db.prepare('SELECT * FROM users').all();
        return statement;

    },

    get_user: (username) => {
        const db = require('better-sqlite3')('./database/anime_watchlist.db');
        try {
            let statement = db.prepare('SELECT USR_ID, USR_username, USR_name, USR_passwords FROM users WHERE USR_username = ?').get(username);
            return statement
        } catch (TypeError) {
            return null;
        }
    },

    findOrAddGoogleUser: (id, displayName, name) => {
        const db = require('better-sqlite3')('./database/anime_watchlist.db');
        let statement = db.prepare('SELECT USR_ID, USR_username, USR_name FROM users WHERE USR_ID = ?').get(id);
        if (statement) {
            return statement;
        }
        let insert = db.prepare(`INSERT INTO users (USR_ID, USR_name, USR_username, USR_passwords) VALUES(?, ?, ?, NULL)`);
        insert.run(id, name.givenName, displayName);
        statement = db.prepare('SELECT USR_ID, USR_username, USR_name FROM users WHERE USR_ID = ?').get(id);
        return statement
    },
};

console.log(userModel.list_users());

module.exports = {
    userModel
};