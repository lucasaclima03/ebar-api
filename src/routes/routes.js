const express = require('express');
const router = express.Router();
const multer = require('multer');

const multerConfig = require('../config/multer')

const VehiclesController = require('../controllers/VehiclesController')

router.post('/vehicles', multer(multerConfig).single('file'), VehiclesController.create);
router.get('/vehicles', VehiclesController.findAll);
router.put('/vehicles', VehiclesController.update);
router.delete('/vehicles/:_id', VehiclesController.delete);
router.get('/vehicles/:_id', VehiclesController.findById);


module.exports = router;