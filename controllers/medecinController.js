const Medecin = require('../models/Medecin');

exports.createMedecin = async (req, res, next) => {
  try {
    const { nom, nombreJours, tauxJournalier } = req.body;
    const medecin = await Medecin.create({ nom, nombreJours, tauxJournalier });
    res.status(201).json(medecin);
  } catch (error) {
    console.error('Error creating medecin:', error);
    res.status(400).json({ error: error.message });
  }
};

exports.getAllMedecins = async (req, res, next) => {
  try {
    const medecins = await Medecin.findAll();
    res.status(200).json(medecins);
  } catch (error) {
    console.error('Error fetching medecins:', error);
    res.status(400).json({ error: error.message });
  }
};

exports.getOneMedecin = async (req, res, next) => {
  try {
    const medecin = await Medecin.findById(req.params.id);
    if (!medecin) {
      return res.status(404).json({ error: 'Médecin non trouvé' });
    }
    res.status(200).json(medecin);
  } catch (error) {
    console.error('Error fetching medecin:', error);
    res.status(400).json({ error: error.message });
  }
};

exports.updateMedecin = async (req, res, next) => {
  try {
    const { nom, nombreJours, tauxJournalier } = req.body;
    const medecin = await Medecin.update(req.params.id, { nom, nombreJours, tauxJournalier });
    
    if (!medecin) {
      return res.status(404).json({ error: 'Médecin non trouvé' });
    }
    
    res.status(200).json(medecin);
  } catch (error) {
    console.error('Error updating medecin:', error);
    res.status(400).json({ error: error.message });
  }
};

exports.deleteMedecin = async (req, res, next) => {
  try {
    const success = await Medecin.delete(req.params.id);
    
    if (!success) {
      return res.status(404).json({ error: 'Médecin non trouvé' });
    }
    
    res.status(200).json({ message: 'Médecin supprimé !' });
  } catch (error) {
    console.error('Error deleting medecin:', error);
    res.status(400).json({ error: error.message });
  }
};

exports.getStats = async (req, res, next) => {
  try {
    const stats = await Medecin.getStats();
    res.status(200).json(stats);
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(400).json({ error: error.message });
  }
};