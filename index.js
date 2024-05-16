import express from 'express';
import route from './router/route';
import path from 'path'
import flash from 'express-flash';
import session from 'express-session';
import 'dotenv/config'

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(flash())

app.set('view engine','ejs')
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')))

app.use(session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: true,
    name : "session"
}));

app.use(route)

app.listen(4000,()=>{
    console.log("Server Running at http://localhost:4000")
})