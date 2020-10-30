const express = require('express');
const router = express.Router();
const pool= require('../database');

// router.get('/',(req, res,)=> {
//     res.render('users/list');
// })

router.get('/add',(req, res,)=> {
    res.render('users/add');
})

router.get('/',async(req,res)=>{
    const usuario = await pool.query('select * from `usuarios`');
    res.render('users/list',{usuario});
});

router.post('/add',async(req,res)=>{
    const {nombre, apellido, telefono, usuario, email, contra}= req.body;
    const newUsuario = {nombre, apellido, telefono, usuario, email, contra};
    await pool.query('insert into usuarios set ?', [newUsuario]);
    res.redirect('/usuario');
    
});

router.get('/delete/:id',async(req,res)=>{
    const {id} = req.params;
    const usuario = await pool.query('delete from usuarios where id=?',[id]);
    res.redirect('/usuario');
    console.log(usuario);
    
});

router.get('/update/:id',async(req,res)=>{
    const {id} = req.params;
    const usuario = await pool.query('select * from `usuarios` where id=?',[id]);
    res.render('users/add',{usuario});
    console.log(usuario);
 });
 
 router.post('/update/:id',async(req,res)=>{
    const {id} = req.params;
    const {nombre, apellido, telefono, usuario, email, contra} = req.body;
    const updateUser = {nombre, apellido, telefono, usuario, email, contra};
    await pool.query('update `usuarios` set ? where id=?',[updateUser, id]);
    res.redirect('/usuario');
    console.log(updateUser, id);
  });
 


module.exports = router;