const express = require('express');
const router = express.Router();
const storeController = require('../controllers/storeController');
const jwt = require('jsonwebtoken');

function checkToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ msg: "Token inválida" });
    }

    try {
        const secret = process.env.SECRET;
        jwt.verify(token, secret);
        next();
    } catch (err) {
        console.error("Error verifying token:", err);
        res.status(401).json({ msg: "Erro na verificação do token", error: err.message });
    }
}

function isAdmin(req, res, next) {
    const usertoken = req.headers.authorization;
    const token = usertoken.split(' ');
    const tokenData = jwt.verify(token[1], process.env.SECRET);

    if (tokenData.role == 3)
        next()
    else
        res.status(403).json()
}

router.post('/CreateStore', checkToken, isAdmin, storeController.CreateStore);
router.post('/EditStore', checkToken, isAdmin, storeController.EditStore);
router.post('/RemoveStore', checkToken, isAdmin, storeController.RemoveStore);
router.get('/ReadStore', checkToken, isAdmin, storeController.ListStore);
router.get('/ReadStores', checkToken, isAdmin, storeController.ListStores);

module.exports = router;