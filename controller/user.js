import { QueryTypes } from "sequelize";
import { db } from "../database/db";
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

export const regis = async(req,res)=>{
    const username = req.body.username;
    const password = req.body.password;
    const confirmPassword = req.body.confirm;
    const email = req.body.email;
    const uuid = uuidv4();

    const hash = await bcrypt.hash(password, 10);

    if (email && username && password && confirmPassword) {
        if (password !== confirmPassword) {
            req.flash('message', "Password dan konfirmasi password harus sama!!");
            res.redirect('/regis');
        } else {
            try {
                const existingUser = await db.query("SELECT * FROM user WHERE username = :user OR email = :email", {
                    replacements: {
                        user: username,
                        email: email
                    },
                    type: QueryTypes.SELECT
                });
    
                if (existingUser.length > 0) {
                    req.flash('message', "Username atau email sudah digunakan!!");
                    res.redirect('/regis');
                } else {
                    await db.query("INSERT INTO user (id, username, password, email) VALUES (:id, :user, :pass, :email)", {
                        type: QueryTypes.INSERT,
                        replacements: {
                            id: uuid,
                            user: username,
                            pass: hash, 
                            email: email
                        }
                    });
    
                    req.session.userId = uuid;
                    res.redirect('/biodata');
                }
            } catch (error) {
                console.log(error);
                req.flash('message', "Server Error");
                res.redirect('/regis');
            }
        }
    } else {
        req.flash('message', "Form tidak boleh kosong!!");
        res.redirect('/regis');
    }

}

export const login = async(req,res) =>{
    const username = req.body.username;
    const pass = req.body.password;

    if (username && pass) {
        try {
            const result = await db.query("SELECT * FROM user WHERE username = :user", {
                replacements: { user: username },
                type: QueryTypes.SELECT
            });
    
            if (!result || result.length === 0) {
                req.flash('message', "Username atau password salah!!");
                res.redirect('/login');
            } else {
                const match = await bcrypt.compare(pass, result[0].password);
                
                if (match) {
                    req.session.userId = result[0].id;
                    res.redirect('/biodata');
                } else {
                    req.flash('message', "Username atau password salah!!");
                    res.redirect('/login');
                }
            }
        } catch (err) {
            console.log(err);
            req.flash('message', "Server Error");
            res.redirect('/login');
        }
    } else {
        req.flash('message', "Username atau password tidak boleh kosong!!");
        res.redirect('/login');
    }
};
