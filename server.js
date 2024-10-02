
require ('dotenv').config()

const express= require('express') //
const pg = require ('pg')//
const bcrypt = require('bcrypt')
const session = require('express-session')
const expressLayouts= require('express-ejs-layouts')//
const methodOverride= require('method-override')
const db = require('./db')


const app = express()
const port = 8080

const requestlogger= require ('./middlewares/request_logger.js') 
const setCurrentUser = require('./middlewares/set_current_user.js')
const ensureLoggedIn = require('./middlewares/ensure_logged_in.js')

const sessionRouter = require('./routes/session_router')
const postRouter = require('./routes/post_router')
const homeRouter = require('./routes/home_router')
const userRouter = require('./routes/user_router')
const commentRouter = require('./routes/comment_router')
const eventRouter = require('./routes/event_router.js')
const profileRouter = require('./routes/profile_router.js')
const shopnparkRouter = require('./routes/shopnpark_router.js')
const vetRouter = require('./routes/vet_router.js')

app.set('view engine', 'ejs')

app.use(express.urlencoded({extended: false}))

app.use(express.static('public'))

app.use(methodOverride("_method"))

app.use(requestlogger)

app.use(session({
    cookie: {maxAge: 1000 * 60 * 60 * 24 * 3}, 
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))

app.use(setCurrentUser)

app.use(expressLayouts)

app.use(homeRouter)

app.use(userRouter)

app.use(sessionRouter)

app.use(shopnparkRouter)

app.use(vetRouter)

app.use(eventRouter)

app.use(ensureLoggedIn)

app.use(profileRouter)

app.use(postRouter)

app.use(commentRouter)

app.listen(port, () => {
  console.log(`server listening on port ${port}`);
})