const { Pool } = require('pg');
const path = require('path');
require('dotenv').config();

//export db object for node-postgres when connecting from production cloud run service

const config = {

  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  host: process.env.INSTANCE_UNIX_SOCKET

};

const pool = new Pool(config);

module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  },
};