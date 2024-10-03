const express = require('express')
const router = express.Router()
const db = require('../db')
const bcrypt = require('bcrypt')
const ensureLoggedIn = require('../middlewares/ensure_logged_in')

router.get('/events/new', ensureLoggedIn, (req,res) => {
    res.render('event_form')
})
router.get('/events', (req,res)=>{
    console.log(req.session.userId);
    
    let sql ='SELECT * FROM events FULL OUTER JOIN users ON user_id = users.id;'

    db.query(sql,(err,result)=>{
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
        res.redirect('/events')
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
 router.delete("/events/:eventId", ensureLoggedIn, (req, res) => {
    const sql = `
      DELETE FROM events WHERE id = $1;
    `
    db.query(sql, [req.params.eventId],(err, result) => {
      if (err) {
        console.log(err);
      }

      res.redirect('/events')
    }) 
});

router.get('/events/:eventId/edit', ensureLoggedIn, (req, res)=>{
const sql = `SELECT * FROM posts WHERE id = $1;`

db.query(sql, [req.params.postId], (err,result)=>{ 
    if(err){
        console.log(err);
        
    }
    let post = result.rows[0]
    res.render('event_edit', {post})
})
})

router.put('/events/:eventId', ensureLoggedIn, (req, res) => {
    const eventTitle = req.body.event_title
    const imageUrl = req.body.image_url
    const description = req.body.description
    const location = req.body.location
    const category = req.body.category
    const eventId = req.params.eventId

    let sql= `
    UPDATE events
    SET event_title = $1, 
    image_url = $2, 
    location = $3,
    description = $4,
    category = $5
    WHERE id = $6;
    `
    db.query(sql, [eventTitle, imageUrl, location, description, category, eventId], (err,result)=>{
        if(err){
            console.log(err);
        }
        res.redirect(`/events/${eventId}`)
    })
})
 module.exports = router