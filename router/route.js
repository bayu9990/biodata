import express from 'express'
import { login, regis } from '../controller/user'
import { isLoggedin, logged } from '../middleware/isLogin'
import multer from 'multer'
import { v4 as uuidv4 } from 'uuid';

const route = express.Router();
const uuid = uuidv4();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '/assets/')
    },
    filename: function (req, file, cb) {
        cb(null, uuid + "-" + file.originalname)
    }
});

const upload = multer({ storage: storage });

route.get('/',(req,res)=>{
    res.render('home')
});

route.post('/upload',upload.single('img'),(req,res)=>{
    res.redirect('/biodata')
})

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

route.get('/biodata/profile',isLoggedin,(req,res)=>{
    res.render('profile')
})

export default route;