import pg from 'pg';
const { Pool } = pg;

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'user',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'devision_db',
  port: process.env.DB_PORT || 5432,
});

export const query = (text, params) => pool.query(text, params);