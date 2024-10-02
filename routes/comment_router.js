const express= require('express')
const ensureLoggedIn = require('../middlewares/ensure_logged_in')
const router = express.Router()
const db = require('../db')

router.post('/comments', ensureLoggedIn, (req,res)=>{

    console.log(req.body);

    let content = req.body.content
    let userId = req.session.userId
    let postId = req.body.post_id

    const sql = `
    INSERT INTO comments
    (content, user_id, post_id)
    VALUES
    ($1, $2, $3);
    ` 
    db.query(sql, [content, userId, postId], (err, result)=>{
        if(err){
            console.log(err);
        }
        res.redirect(`/posts/${postId}`)
    })
})

module.exports = router