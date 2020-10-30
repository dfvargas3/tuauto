const express = require('express');
const router = express.Router();
const pool= require('../database');

router.get('/add',(req, res,)=> {
    res.render('tipo_vehiculo/add');
})

router.get('/',async(req,res)=>{
    const tipo_vehiculo = await pool.query('select * from `tipo_vehiculo`');
    res.render('tipo_vehiculo/list',{tipo_vehiculo});
});

router.post('/add',async(req,res)=>{
    const {nombre}= req.body;
    const newtipo_vehiculo = {nombre};
    await pool.query('insert into tipo_vehiculo set ?', [newtipo_vehiculo]);
    res.redirect('/tipo_vehiculo');
    console.log(newtipo_vehiculo);
});

router.get('/delete/:id',async(req,res)=>{
    const {id} = req.params;
    const tipo_vehiculo = await pool.query('delete from tipo_vehiculo where id=?',[id]);
    res.redirect('/tipo_vehiculo');
    console.log(tipo_vehiculo);   
});

router.get('/update/:id',async(req,res)=>{
    const {id} = req.params;
    const tipo_vehiculo = await pool.query('select * from `tipo_vehiculo` where id=?',[id]);
    res.render('tipo_vehiculo/add',{tipo_vehiculo});
    console.log(tipo_vehiculo);
 });
 
 router.post('/update/:id',async(req,res)=>{
    const {id} = req.params;
    const {nombre} = req.body;
    const updatetipo_vehiculo = {nombre};
    await pool.query('update `tipo_vehiculo` set ? where id=?',[updatetipo_vehiculo, id]);
    res.redirect('/tipo_vehiculo');
    console.log(updatetipo_vehiculo, id);
  });
 
module.exports= router;