const express = require('express')
const router = express.Router()
const db = require('../db')
const bcrypt = require('bcrypt')
const ensureLoggedIn = require('../middlewares/ensure_logged_in')


router.get('/events', (req,res)=>{
    console.log(req.session.userId);
    
    db.query('SELECT * FROM events;',(err,result)=>{
        if(err){
            console.log(err);
        } 
        let events = result.rows 
        res.render('event_home', {events})
    })
})

router.post('/events', ensureLoggedIn, (req,res)=>{
    let userId = req.session.userId
    let title = req.body.event_title
    let imageUrl= req.body.image_url
    let location= req.body.location
    let description = req.body.description
    let category= req.body.category

    let sql= 
        `INSERT INTO events
        (user_id, event_title, image_url, location, description, category) 
        VALUES 
        ($1, $2, $3, $4, $5, $6);`

    db.query(sql, [userId, title, imageUrl, location, description, category], (err,result)=>{
        if (err){
            console.log(err);
            
        }
        res.redirect('/')
    })
})

router.get('/events/:id', (req,res)=>{
    let sql = `SELECT * FROM events WHERE id = $1;`
     db.query(sql, [req.params.id], (err,result)=>{ 
         if(err){
             console.log(err);  
         }
         let event = result.rows[0]

         res.render('event', {event})
     })
 })

 module.exports = router