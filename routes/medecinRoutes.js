const express = require('express');
const router = express.Router();

const medecinController = require('../controllers/medecinController');

router.post('/', medecinController.createMedecin);
router.get('/', medecinController.getAllMedecins);
router.get('/:id', medecinController.getOneMedecin);
router.put('/:id', medecinController.updateMedecin);
router.delete('/:id', medecinController.deleteMedecin);
router.get('/stats/total', medecinController.getStats);

module.exports = router;