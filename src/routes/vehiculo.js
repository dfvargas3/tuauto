const express = require('express');
const router = express.Router();
const pool= require('../database');

router.get('/add',async(req,res)=> {
    const marca = await pool.query('select * from `marca`');
    res.render('vehiculo/add',{marca});
});

router.get('/',async(req,res)=>{
    const vehiculo = await pool.query('select v.id as id, v.tipo as tipo, v.placa as placa, v.color as color, '+
            'v.observaciones as observaciones, m.nombre as marca, v.alias as alias '+
            'from vehiculo as v, marca as m '+
            'where v.id_marca = m.id ');
    res.render('vehiculo/list',{vehiculo});
});

router.post('/add',async(req,res)=>{
    const {tipo, placa, id_marca, color, alias, observaciones}= req.body;
    const newvehiculo = {tipo, placa, id_marca, color, alias, observaciones};
    await pool.query('insert into vehiculo set ?', [newvehiculo]);
    res.redirect('/vehiculo');
    console.log(newvehiculo);
});

router.get('/delete/:id',async(req,res)=>{
    const {id} = req.params;
    const vehiculo = await pool.query('delete from vehiculo where id=?',[id]);
    res.redirect('/vehiculo');
    console.log(vehiculo);
    
});

router.get('/update/:id',async(req,res)=>{
    const {id} = req.params;
    const vehiculo = await pool.query('select * from `vehiculo` where id=?',[id]);
    const marca = await pool.query('select * from `marca`');
    res.render('vehiculo/add',{vehiculo, marca});
    console.log(vehiculo);
 });
 
 router.post('/update/:id',async(req,res)=>{
    const {id} = req.params;
    const {tipo, placa, id_marca, color, alias, observaciones} = req.body;
    const updatevehiculo = {tipo, placa, id_marca, color, alias, observaciones};
    await pool.query('update `vehiculo` set ? where id=?',[updatevehiculo, id]);
    res.redirect('/vehiculo');
    console.log(updatevehiculo, id);
  });
 
module.exports= router;