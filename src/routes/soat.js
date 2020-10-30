const express = require('express');
const router = express.Router();
const pool= require('../database');


router.get('/add',(req, res,)=> {
    res.render('soat/add');
})

router.get('/',async(req,res)=>{
    const soat = await pool.query('select * from `soat`');
    res.render('soat/list',{soat});
});

router.post('/add',async(req,res)=>{
    const {empresa, fecha_compra, fecha_inicio, contacto, precio, observaciones}= req.body;
    const newSoat = {empresa, fecha_compra, fecha_inicio, contacto, precio, observaciones};
    await pool.query('insert into soat set ?', [newSoat]);
    res.redirect('/soat');
    console.log(newSoat);
});

router.get('/delete/:id',async(req,res)=>{
    const {id} = req.params;
    const soat = await pool.query('delete from soat where id=?',[id]);
    res.redirect('/soat');
    console.log(soat);
    
});

router.get('/update/:id',async(req,res)=>{
    const {id} = req.params;
    const soat = await pool.query('select * from `soat` where id=?',[id]);
    res.render('soat/add',{soat});
    console.log(soat);
 });
 
 router.post('/update/:id',async(req,res)=>{
    const {id} = req.params;
    const {empresa, fecha_compra, fecha_inicio, contacto, precio, observaciones} = req.body;
    const updateSoat = {empresa, fecha_compra, fecha_inicio, contacto, precio, observaciones};
    await pool.query('update `soat` set ? where id=?',[updateSoat, id]);
    res.redirect('/soat');
    console.log(updateSoat, id);
  });
 

module.exports= router;