const pool = require('../config/db');

class Medecin {
  static async create({ nom, nombreJours, tauxJournalier }) {
    const [result] = await pool.query(
      'INSERT INTO medecins (nom, nombre_jours, taux_journalier) VALUES (?, ?, ?)',
      [nom, nombreJours, tauxJournalier]
    );
    return this.findById(result.insertId);
  }

  static async findAll() {
    const [rows] = await pool.query('SELECT * FROM medecins');
    return rows;
  }

  static async findById(id) {
    const [rows] = await pool.query('SELECT * FROM medecins WHERE id = ?', [id]);
    return rows[0];
  }

  static async update(id, { nom, nombreJours, tauxJournalier }) {
    await pool.query(
      'UPDATE medecins SET nom = ?, nombre_jours = ?, taux_journalier = ? WHERE id = ?',
      [nom, nombreJours, tauxJournalier, id]
    );
    return this.findById(id);
  }

  static async delete(id) {
    const [result] = await pool.query('DELETE FROM medecins WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }

  static async getStats() {
    const [stats] = await pool.query(`
      SELECT 
        SUM(prestation) AS total,
        MIN(prestation) AS min,
        MAX(prestation) AS max,
        COUNT(id) AS count
      FROM medecins
    `);
    return stats[0] || {};
  }
}

module.exports = Medecin;