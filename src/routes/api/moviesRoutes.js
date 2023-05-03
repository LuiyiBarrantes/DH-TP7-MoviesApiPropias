const express = require('express');
const router = express.Router();
const moviesController = require('../../controllers/api/moviesController');
/* /api */
router.get('/movies', moviesController.list);
router.get('/movies/new', moviesController.new);
router.get('/movies/recommended', moviesController.recomended);
router.get('/movies/:id', moviesController.detail);
router.post('/movies/create', moviesController.create);
router.put('/movies/:id', moviesController.update);
router.delete('/movies/:id', moviesController.destroy);

module.exports = router;