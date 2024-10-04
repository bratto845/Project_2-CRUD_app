require('dotenv').config()

const express = require('express')
const bcrypt = require('bcrypt')
const db = require('../db')

const router = express.Router()

router.get('/new_user', (req, res)=>{
    res.render('new_user')
})

router.post('/new_user', (req,res)=>{

    let email = req.body.email
    let plainTextPass= req.body.password
    let profilePicUrl= req.body.profile_pic
    let petPicUrl= req.body.pet_pic
    let userName= req.body.user_name
    let category= req.body.category
    let saltRounds = 10

    bcrypt.genSalt(saltRounds, (err, salt)=>{
        bcrypt.hash(plainTextPass, salt, (err, hash)=>{
            const sql = `
            INSERT INTO users
            (email, password_digest, profile_pic, pet_pic, category, user_name)
            VALUES
            ($1, $2, $3, $4, $5, $6)
            RETURNING *;
            `
            db.query(sql, [email, hash, profilePicUrl, petPicUrl, category, userName],(err, result) => {
                if (err){
                    console.log(err);
                }
                const user = result.rows[0]
                console.log(user);
                res.redirect('/')
            })
        })
    })

})


module.exports = router