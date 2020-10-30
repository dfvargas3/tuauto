const express = require('express');
const router = express.Router();
const pool= require('../database');

router.get('/add',(req, res,)=> {
    res.render('marca/add');
})

router.get('/',async(req,res)=>{
    const marca = await pool.query('select * from `marca`');
    res.render('marca/list',{marca});
});

router.post('/add',async(req,res)=>{
    const {nombre}= req.body;
    const newmarca = {nombre};
    await pool.query('insert into marca set ?', [newmarca]);
    res.redirect('/marca');
    console.log(newmarca);
});

router.get('/delete/:id',async(req,res)=>{
    const {id} = req.params;
    const marca = await pool.query('delete from marca where id=?',[id]);
    res.redirect('/marca');
    console.log(marca);   
});

router.get('/update/:id',async(req,res)=>{
    const {id} = req.params;
    const marca = await pool.query('select * from `marca` where id=?',[id]);
    res.render('marca/add',{marca});
    console.log(marca);
 });
 
 router.post('/update/:id',async(req,res)=>{
    const {id} = req.params;
    const {nombre} = req.body;
    const updatemarca = {nombre};
    await pool.query('update `marca` set ? where id=?',[updatemarca, id]);
    res.redirect('/marca');
    console.log(updatemarca, id);
  });
 
module.exports= router;