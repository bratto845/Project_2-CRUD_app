const express = require('express')
const router = express.Router()
const db = require('../db')
const bcrypt = require('bcrypt')
const ensureLoggedIn = require('../middlewares/ensure_logged_in')


router.get('/posts/new', ensureLoggedIn, (req,res) => {
    res.render('new_form')
})
router.post('/posts',ensureLoggedIn, (req,res)=>{

    let title = req.body.title
    let imageUrl= req.body.image_url
    let description = req.body.description
    let category= req.body.category
    let userId = req.session.userId

    let sql= 
        `INSERT INTO posts 
        (title, image_url, description, user_id, category) 
        VALUES 
        ($1, $2, $3, $4, $5);`
    db.query(sql, [title, imageUrl, description, userId, category], (err,result)=>{
        if (err){
            console.log(err);
        }
        res.redirect('/')
    })
})

router.get('/posts/:id', (req,res)=>{
   let sql = `SELECT * FROM posts WHERE id = $1;`
    db.query(sql, [req.params.id], (err,result)=>{ 
        if(err){
            console.log(err);  
        }
        let post = result.rows[0] 
        db.query(`SELECT * FROM users WHERE ID = $1;`, [post.user_id], (err,result)=>{
            if(err){
                console.log(err);
            }
            console.log(result);
            let user = result.rows[0]

            const commentsSql=`
            SELECT comments.*, users.email
            FROM comments
            JOIN users
            ON comments.user_id = users.id
            WHERE comments.post_id = $1;
            `

            db.query(commentsSql, [req.params.id], (err, result)=> {
                if (err){
                    console.log(err);
                }
                let comments = result.rows

                console.log(comments);
                
                res.render('post', {post, user, comments})
            })
            
        })
    })
})

router.delete("/posts/:postId", ensureLoggedIn, (req, res) => {
        const sql = `
          DELETE FROM posts WHERE id = $1;
        `
        db.query(sql, [req.params.postId],(err, result) => {
          if (err) {
            console.log(err);
          }

          res.redirect('/')
        })
  });

router.get('/posts/:postId/edit', ensureLoggedIn, (req, res)=>{
   const sql = `SELECT * FROM posts WHERE id = $1;`
   
    db.query(sql, [req.params.postId], (err,result)=>{ 
        if(err){
            console.log(err);
        }
        let post = result.rows[0]
        res.render('edit_form', {post})
    })
  })

router.put('/posts/:postId', ensureLoggedIn, (req, res) => {
    const title = req.body.title
    const imageUrl = req.body.image_url
    const description = req.body.description
    const postId = req.params.postId

    let sql= `
    UPDATE posts
    SET title = $1, 
    image_url = $2, 
    description = $3
    WHERE id = $4;
    `
    db.query(sql, [title, imageUrl, description, postId], (err,result)=>{
        if(err){
            console.log(err);
            
        }
        res.redirect(`/posts/${postId}`)
    })
})

module.exports = router
