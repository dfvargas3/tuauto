const express = require('express');
const router = express.Router();
const pool= require('../database');


router.get('/add',async(req,res)=> {
    const empresa = await pool.query('select * from `empresa`');
    res.render('repuesto/add',{empresa});
});

router.get('/',async(req,res)=>{
    const repuesto = await pool.query('select  r.id as id, r.nombre as nombre, r.marca as marca, '+
        'r.referencia, r.precio as precio, r.observaciones as observaciones, e.nombre as proveedor '+
        'from repuestos as r, empresa as e '+
        'where id_proveedor = e.id');
    res.render('repuesto/list',{repuesto});
    console.log(repuesto);
});

router.post('/add',async(req,res)=>{
    const {nombre, marca, referencia, precio, id_proveedor, observaciones}= req.body;
    const newRepuesto = {nombre, marca, referencia, precio, id_proveedor, observaciones};
    await pool.query('insert into repuestos set ?', [newRepuesto]);
    res.redirect('/repuesto');
    console.log(newRepuesto);
});

router.get('/delete/:id',async(req,res)=>{
    const {id} = req.params;
    const repuesto = await pool.query('delete from repuestos where id=?',[id]);
    res.redirect('/repuesto');
    console.log(repuesto);
    
});

router.get('/update/:id',async(req,res)=>{
    const {id} = req.params;
    const repuesto = await pool.query('select * from `repuestos` where id=?',[id]);
    const empresa = await pool.query('select * from `empresa`');
    res.render('repuesto/add',{repuesto, empresa});
    console.log(empresa);
 });
 
 router.post('/update/:id',async(req,res)=>{
    const {id} = req.params;
    const {nombre, marca, referencia, precio, id_proveedor, observaciones} = req.body;
    const updateUser = {nombre, marca, referencia, precio, id_proveedor, observaciones};
    await pool.query('update `repuestos` set ? where id=?',[updateUser, id]);
    res.redirect('/repuesto');
    console.log(updateUser, id);
  });
 
module.exports= router;