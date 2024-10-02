require('dotenv').config()

const bcrypt = require('bcrypt')
const db = require('./index.js')

let email = 'bvr@ga.com'
let plainTextPass= 'pudding'
let saltRounds = 10


bcrypt.genSalt(saltRounds, (err, salt)=>{
    bcrypt.hash(plainTextPass, salt, (err, hash)=>{
        const sql = `
        INSERT INTO users
        (email, password_digest)
        VALUES
        ('${email}','${hash}')
        RETURNING *;
        `
        db.query(sql, (err, result) => {
            if (err){
                console.log(err);
            }
            const user = result.rows[0]
            console.log(user);
            
        })
    })
})