const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const pool = require('./config/db');

const medecinRoutes = require('./routes/medecinRoutes');

const app = express();

// Configuration du port
const PORT = 8081;

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Test de connexion au démarrage
async function initializeDatabase() {
  try {
    const connection = await pool.getConnection();
    console.log('✅ Connexion à MySQL établie avec succès');
    connection.release();
    
    // Vérification/Création de la table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS medecins (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nom VARCHAR(255) NOT NULL,
        nombre_jours INT NOT NULL,
        taux_journalier DECIMAL(10, 2) NOT NULL,
        prestation DECIMAL(10, 2) GENERATED ALWAYS AS (nombre_jours * taux_journalier) STORED,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Table medecins vérifiée/prête');
  } catch (error) {
    console.error('❌ Erreur de connexion à la base de données:', error);
    process.exit(1);
  }
}

// Initialisation
initializeDatabase();

// Routes
app.use('/api/medecins', medecinRoutes);

// Route de test
app.get('/', (req, res) => {
  res.json({ message: 'API de gestion des médecins' });
});

// Gestion des erreurs centralisée
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Erreur serveur',
    message: err.message 
  });
});

// Démarrer le serveur seulement si ce fichier est exécuté directement
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`🚀 Serveur démarré sur le port ${PORT}`);
    console.log(`🔗 http://localhost:${PORT}`);
  });
}

module.exports = app;