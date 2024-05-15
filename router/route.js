import express from 'express'
import { login } from '../controller/user'
import { isLoggedin, logged } from '../middleware/isLogin'

const route = express.Router()

route.get('/',(req,res)=>{
    res.render('home')
})

route.post('/login',login)

route.get('/login',logged,(req,res)=>{
    res.render('login',{ message: req.flash('message') })
})

route.get('/regis',logged,(req,res)=>{
    res.render('regis')
})

route.get('/biodata',isLoggedin,(req,res)=>{
    res.render('biodata')
})

export default route;