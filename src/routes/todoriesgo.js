const express = require('express');
const router = express.Router();
const pool= require('../database');

router.get('/add',(req, res,)=> {
    res.render('todoriesgo/add');
})

router.get('/',async(req,res)=>{
    const todoriesgo = await pool.query('select * from `todoriesgo`');
    res.render('todoriesgo/list',{todoriesgo});
});

router.post('/add',async(req,res)=>{
    const {empresa, fecha_inicio, cubrimiento, contacto, precio, observaciones}= req.body;
    const newtodoriesgo = {empresa, fecha_inicio, cubrimiento, contacto, precio, observaciones};
    await pool.query('insert into todoriesgo set ?', [newtodoriesgo]);
    res.redirect('/todoriesgo');
    console.log(newtodoriesgo);
});

router.get('/delete/:id',async(req,res)=>{
    const {id} = req.params;
    const todoriesgo = await pool.query('delete from todoriesgo where id=?',[id]);
    res.redirect('/todoriesgo');
    console.log(todoriesgo);
    
});

router.get('/update/:id',async(req,res)=>{
    const {id} = req.params;
    const todoriesgo = await pool.query('select * from `todoriesgo` where id=?',[id]);
    res.render('todoriesgo/add',{todoriesgo});
    console.log(todoriesgo);
 });
 
 router.post('/update/:id',async(req,res)=>{
    const {id} = req.params;
    const {empresa, fecha_inicio, cubrimiento, contacto, precio, observaciones} = req.body;
    const updatetodoriesgo = {empresa, fecha_inicio, cubrimiento, contacto, precio, observaciones};
    await pool.query('update `todoriesgo` set ? where id=?',[updatetodoriesgo, id]);
    res.redirect('/todoriesgo');
    console.log(updatetodoriesgo, id);
  });
 
module.exports= router;