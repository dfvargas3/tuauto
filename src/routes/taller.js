const express = require('express');
const router = express.Router();
const pool= require('../database');

router.get('/add',(req, res,)=> {
    res.render('taller/add');
})

router.get('/',async(req,res)=>{
    const taller = await pool.query('select * from `taller`');
    res.render('taller/list',{taller});
});

router.post('/add',async(req,res)=>{
    const {nombre, alias, direccion, telefono, ciudad, contacto}= req.body;
    const newtaller = {nombre, alias, direccion, telefono, ciudad, contacto};
    await pool.query('insert into taller set ?', [newtaller]);
    res.redirect('/taller');
    console.log(newtaller);
});

router.get('/delete/:id',async(req,res)=>{
    const {id} = req.params;
    const taller = await pool.query('delete from taller where id=?',[id]);
    res.redirect('/taller');
    console.log(taller);
    
});

router.get('/update/:id',async(req,res)=>{
    const {id} = req.params;
    const taller = await pool.query('select * from `taller` where id=?',[id]);
    res.render('taller/add',{taller});
    console.log(taller);
 });
 
 router.post('/update/:id',async(req,res)=>{
    const {id} = req.params;
    const {nombre, alias, direccion, telefono, ciudad, contacto} = req.body;
    const updatetaller = {nombre, alias, direccion, telefono, ciudad, contacto};
    await pool.query('update `taller` set ? where id=?',[updatetaller, id]);
    res.redirect('/taller');
    console.log(updatetaller, id);
  });
 
module.exports= router;