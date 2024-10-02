require('dotenv').config()

const express = require('express')
const bcrypt = require('bcrypt')
const db = require('../db')

const router = express.Router()

router.get('/profile/:id', (req,res)=>{
    let sql = `SELECT * FROM users WHERE id = $1;`
     db.query(sql, [req.params.id], (err,result)=>{ 
         if(err){
             console.log(err);  
         }
         let user = result.rows[0]
             
                 
        res.render('profile', {user})

     })
 })


module.exports = router