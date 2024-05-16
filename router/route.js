import express from 'express'
import { login, regis } from '../controller/user'
import { isLoggedin, logged } from '../middleware/isLogin'

const route = express.Router()

route.get('/',(req,res)=>{
    res.render('home')
});

route.post('/login',login);

route.get('/login',logged,(req,res)=>{
    res.render('login',{ message: req.flash('message') })
});

route.get('/logout',(req,res)=>{
    req.session.destroy()
    res.redirect('/')
})

route.post('/regis',regis);

route.get('/regis',logged,(req,res)=>{
    res.render('regis', { message: req.flash('message') })
});

route.get('/biodata',isLoggedin,(req,res)=>{
    res.render('biodata')
});

export default route;