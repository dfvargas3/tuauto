const express = require('express');
const router = express.Router();
const pool= require('../database');

router.get('/add',(req, res,)=> {
    res.render('tipo_empresa/add');
})

router.get('/',async(req,res)=>{
    const tipo_empresa = await pool.query('select * from `tipo_empresa`');
    res.render('tipo_empresa/list',{tipo_empresa});
});

router.post('/add',async(req,res)=>{
    const {nombre}= req.body;
    const newtipo_empresa = {nombre};
    await pool.query('insert into tipo_empresa set ?', [newtipo_empresa]);
    res.redirect('/tipo_empresa');
    console.log(newtipo_empresa);
});

router.get('/delete/:id',async(req,res)=>{
    const {id} = req.params;
    const tipo_empresa = await pool.query('delete from tipo_empresa where id=?',[id]);
    res.redirect('/tipo_empresa');
    console.log(tipo_empresa);   
});

router.get('/update/:id',async(req,res)=>{
    const {id} = req.params;
    const tipo_empresa = await pool.query('select * from `tipo_empresa` where id=?',[id]);
    res.render('tipo_empresa/add',{tipo_empresa});
    console.log(tipo_empresa);
 });
 
 router.post('/update/:id',async(req,res)=>{
    const {id} = req.params;
    const {nombre} = req.body;
    const updatetipo_empresa = {nombre};
    await pool.query('update `tipo_empresa` set ? where id=?',[updatetipo_empresa, id]);
    res.redirect('/tipo_empresa');
    console.log(updatetipo_empresa, id);
  });
 
module.exports= router;
