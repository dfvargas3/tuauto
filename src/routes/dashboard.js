const express = require('express');
const router = express.Router();
const pool= require('../database');
const dashboardController = require('../controllers/dashboard');

// router.get('/',(req, res,)=> {
//     res.render('dashboard');
// })


router.get('/',async(req,res)=>{
    // const vehiculo = await pool.query('select v.id as id, v.tipo as tipo, v.placa as placa, v.color as color, '+
    //         'v.observaciones as observaciones, m.nombre as marca, v.alias as alias '+
    //         'from vehiculo as v, marca as m '+
    //         'where v.id_marca = m.id ');
    const vehiculo = await dashboardController.listAll();
    res.render('dashboard',{vehiculo});
});


module.exports= router;