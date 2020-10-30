const express = require('express');
const router = express.Router();
const pool= require('../database');

router.get('/add',async(req,res)=> {
    const tipo_empresa = await pool.query('select * from `tipo_empresa`');
    res.render('empresa/add',{tipo_empresa});
});

router.get('/',async(req,res)=>{
    const empresa = await pool.query('select e.id as id, e.nombre as nombre, e.direccion as direccion, '+
            'e.telefono as telefono, e.ciudad as ciudad, e.observaciones as observaciones, '+
            'te.nombre as tipodeempresa '+
        'from empresa as e, tipo_empresa as te '+
        'where e.id_tipo_empresa = te.id');
    res.render('empresa/list',{empresa});
});

router.post('/add',async(req,res)=>{
    const {nombre, id_tipo_empresa, direccion, telefono, ciudad, observaciones}= req.body;
    const newempresa = {nombre, id_tipo_empresa, direccion, telefono, ciudad, observaciones};
    await pool.query('insert into empresa set ?', [newempresa]);
    res.redirect('/empresa');
    console.log(newempresa);
});

router.get('/delete/:id',async(req,res)=>{
    const {id} = req.params;
    const empresa = await pool.query('delete from empresa where id=?',[id]);
    res.redirect('/empresa');
    console.log(empresa);
    
});

router.get('/update/:id',async(req,res)=>{
    const {id} = req.params;
    const empresa = await pool.query('select * from `empresa` where id=?',[id]);
    const tipo_empresa = await pool.query('select * from `tipo_empresa`');
    res.render('empresa/add',{empresa, tipo_empresa});
    console.log(empresa);
 });
 
 router.post('/update/:id',async(req,res)=>{
    const {id} = req.params;
    const {nombre, id_tipo_empresa, direccion, telefono, ciudad, observaciones} = req.body;
    const updateempresa = {nombre, id_tipo_empresa, direccion, telefono, ciudad, observaciones};
    await pool.query('update `empresa` set ? where id=?',[updateempresa, id]);
    res.redirect('/empresa');
    console.log(updateempresa, id);
  });
 
module.exports= router;