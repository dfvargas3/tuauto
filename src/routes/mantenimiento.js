const express = require('express');
const router = express.Router();
const pool= require('../database');

router.get('/',(req, res,)=> {
    res.render('mantenimiento/list');
})

router.get('/add',(req, res,)=> {
    res.render('mantenimiento/add');
})

module.exports= router;