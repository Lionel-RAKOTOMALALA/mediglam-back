const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'gestion_medecins',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test immédiat de la connexion (optionnel)
pool.getConnection()
  .then(conn => {
    console.log('Base de données connectée');
    conn.release();
  })
  .catch(err => {
    console.error('Erreur de connexion DB:', err);
  });

module.exports = pool;