const express = require('express');
const router = express.Router();
const actorsController = require('../../controllers/api/actorsController');

/* /api */
router.get('/actors', actorsController.list);
router.get('/actors/:id', actorsController.detail);
router.post('/actors', actorsController.store);
router.post('/actors/:id', actorsController.update);
router.delete('/actors/:id', actorsController.destroy);


module.exports = router;