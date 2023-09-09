const express = require('express');
const{ 
    getAllBikes,
    getBike,
    createBike,
    updateBike,
    deleteBike
} = require('../controllers/bike.controller');


const bikeRoutes = express.Router();
bikeRoutes.get('/', getAllBikes).post('/', createBike);
bikeRoutes.get('/:bikeId', getBike);
bikeRoutes.put('/:bikeId', updateBike);
bikeRoutes.delete('/:bikeId', deleteBike);
module.exports = bikeRoutes;