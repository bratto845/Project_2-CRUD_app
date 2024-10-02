const express= require('express')
const router = express.Router()
const db = require('../db')

router.get('/', (req,res)=>{
    console.log(req.session.userId);
    
    db.query('SELECT * FROM posts;',(err,result)=>{ 
        let posts = result.rows 
        res.render('home', {posts})
    })
})

module.exports = router



