const express = require('express')
const router = express.Router()
const db = require('../db')
const bcrypt = require('bcrypt')
const ensureLoggedIn = require('../middlewares/ensure_logged_in')

router.get('/vets', (req,res)=>{
    console.log(req.session.userId);
    
    db.query('SELECT * FROM vets;',(err,result)=>{
        if(err){
            console.log(err);
        } 
        let places = result.rows 
        res.render('vets', {places})
    })
})



module.exports = router