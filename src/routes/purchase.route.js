const { getAll, buyCart } = require('../controllers/purchase.controller');
const express = require('express');
const verifyJWT = require('../utils/verifyJWT');

const purchaseRouter = express.Router();

purchaseRouter.route('/')
    .get(verifyJWT, getAll)
    .post(verifyJWT, buyCart);

module.exports = purchaseRouter;