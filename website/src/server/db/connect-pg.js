const { Pool } = require('pg');
require('dotenv').config();

const config = {

    user: process.env.DB_USER,
    host: process.env.INSTANCE_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT

}

const pool = new Pool(config);

module.exports = {
    query: (text, params, callback) => {
        console.log('executed query', text);
        return pool.query(text, params, callback);
    }
};