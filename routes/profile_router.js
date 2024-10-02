require('dotenv').config()

const express = require('express')
const bcrypt = require('bcrypt')
const db = require('../db')
const ensureLoggedIn = require('../middlewares/ensure_logged_in')
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

router.get('/profile/:profileId/edit', ensureLoggedIn, (req, res)=>{
    const sql = `SELECT * FROM users WHERE id = $1;`
    let user =req.params.profileId
    
     db.query(sql, [req.params.profileId], (err,result)=>{ 
         if(err){
             console.log(err);
             
         }
         let profile = result.rows[0]
         res.render('update_profile', {profile, user})
    })
})

router.put('/profile/:profileId', ensureLoggedIn, (req, res) => {
   let userName = req.body.user_name
    let profilePicUrl= req.body.profile_pic
    let petPicUrl= req.body.pet_pic
    let category= req.body.category
    let profileId = req.params.profileId
   
    let sql= `
    UPDATE profile
    SET user_name = $1, 
    profile_pic = $2, 
    pet_pic = $3
    category = $4
    WHERE id = $5
    `
    db.query(sql, [userName, profilePicUrl, petPicUrl, category, profileId], (err,result)=>{
        if(err){
            console.log(err);
            
        }
        res.redirect(`/profile/${profileId}`)
    })
})
router.delete("/profile/:profileId", ensureLoggedIn, (req, res) => {
 
    const sql = `
      DELETE FROM users WHERE id = $1;
    `
    db.query(sql, [req.params.profileId],(err, result) => {
      if (err) {
        console.log(err);
      }
        req.session.destroy((err)=>{
            if(err){
                console.log(err);
            }
            res.redirect('/')
        })
    })
});
module.exports = router