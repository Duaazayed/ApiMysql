const express = require('express');
const { 
    getAllReservation,
    getReservation,
    createReservation,
    updateReservation,
    deleteReservation
} = require('../controllers/reservation.controllers');
const canAccess = require('../middleware/auth.middleware');

const reservationRoutes = express.Router();

reservationRoutes.get('/', canAccess, getAllReservation).post('/', canAccess, createReservation);
reservationRoutes.get('/:reservationId', canAccess, getReservation);
reservationRoutes.put('/:reservationId', canAccess ,updateReservation);
reservationRoutes.delete('/:reservationId', canAccess, deleteReservation);
module.exports = reservationRoutes;