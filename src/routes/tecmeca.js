const express = require('express');
const router = express.Router();
const pool= require('../database');

router.get('/add',(req, res,)=> {
    res.render('tecmeca/add');
})

router.get('/',async(req,res)=>{
    const tecmeca = await pool.query('select * from `tecmeca`');
    res.render('tecmeca/list',{tecmeca});
});

router.post('/add',async(req,res)=>{
    const {empresa, fecha_inicio, contacto, precio, observaciones}= req.body;
    const newtecmeca = {empresa, fecha_inicio, contacto, precio, observaciones};
    await pool.query('insert into tecmeca set ?', [newtecmeca]);
    res.redirect('/tecmeca');
    console.log(newtecmeca);
});

router.get('/delete/:id',async(req,res)=>{
    const {id} = req.params;
    const tecmeca = await pool.query('delete from tecmeca where id=?',[id]);
    res.redirect('/tecmeca');
    console.log(tecmeca);
    
});

router.get('/update/:id',async(req,res)=>{
    const {id} = req.params;
    const tecmeca = await pool.query('select * from `tecmeca` where id=?',[id]);
    res.render('tecmeca/add',{tecmeca});
    console.log(tecmeca);
 });
 
 router.post('/update/:id',async(req,res)=>{
    const {id} = req.params;
    const {empresa, fecha_inicio, contacto, precio, observaciones} = req.body;
    const updatetecmeca = {empresa, fecha_inicio, contacto, precio, observaciones};
    await pool.query('update `tecmeca` set ? where id=?',[updatetecmeca, id]);
    res.redirect('/tecmeca');
    console.log(updatetecmeca, id);
  });
 
module.exports= router;