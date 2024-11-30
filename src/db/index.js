require('dotenv').config();

const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DB_URL,
  ssl: { rejectUnauthorized: false } 
});

pool.connect()
  .then(() => console.log('Connected to PostgreSQL!'))
  .catch((err) => console.error('Connection error', err.stack));

module.exports = pool;

