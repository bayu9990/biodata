import express from 'express'
import { login, regis } from '../controller/user'
import { isLoggedin, logged } from '../middleware/isLogin'
import busboy from 'busboy';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const route = express.Router();

route.get('/',(req,res)=>{
    res.render('home')
});

route.post('/login',login);

route.post('/upload',(req,res)=>{
    const bb = busboy({ headers: req.headers });
    bb.on('file', (fieldname, file, filename, encoding, mimetype) => {

        const uniqueFilename = `${uuidv4()}-${filename.filename}`;
        const dir = path.join(__dirname, '../public/assets/profile', uniqueFilename);
        console.log(filename.filename);
        
        const writeStream = fs.createWriteStream(dir);

        file.pipe(writeStream);
        file.on('end', () => {
            console.log("udah")
        });
    });

    bb.on('finish', () => {
        console.log('Upload complete');
        req.unpipe(bb);
    });

    req.pipe(bb);
})

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