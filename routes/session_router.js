const express = require('express')
const router = express.Router()
const db = require('../db')
const bcrypt = require('bcrypt')

router.get('/login', (req, res)=>{
    res.render('login')
})

router.post('/login', (req, res)=>{
    const email = req.body.email
    const password = req.body.password
    const sql =`
    SELECT *
    FROM users
    WHERE email = '${email}';
    `
    db.query(sql, (err, result)=>{
        if (err){
            console.log(err);
        }
        if(result.rows.length === 0){
            console.log('user not found')
            return res.send('user not found');
        }
        const user = result.rows[0]
        bcrypt.compare(password, user.password_digest, (err, isCorrect)=>{
            if(err){
                console.log(err);
            }
            if(!isCorrect){
                console.log('password is wrong');
                return res.send('password is wrong')
            }
            req.session.userId = user.id
            res.redirect('/')
        })
    })
})

router.delete('/session', (req, res)=>{
    req.session.destroy((err)=>{
        if(err){
            console.log(err);
        }
        res.redirect('/login')
    })
})

module.exports = router