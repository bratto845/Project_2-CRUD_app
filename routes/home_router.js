const express= require('express')
const router = express.Router()
const db = require('../db')

router.get('/', (req,res)=>{
    console.log(req.session.userId);
    let sql = 'SELECT posts.*, users.user_name, users.profile_pic FROM posts JOIN users ON posts.user_id = users.id;'

    db.query(sql, (err,result)=>{ 
        let posts = result.rows 
        res.render('home', {posts})
    })
})

module.exports = router







