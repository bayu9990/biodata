import { QueryTypes } from "sequelize";
import { db } from "../database/db";

export const login = async(req,res) =>{
    const username = req.body.username;
    const pass = req.body.password;

    try {
        const result = await db.query("SELECT * FROM user WHERE username = :user", {
            replacements: { user: username },
            type: QueryTypes.SELECT
        });

        if (!result || result.length === 0 || result[0].password !== pass) {
            req.flash('message', "Username atau password salah !!");
            req.session.message = null;
            res.redirect('/login');
        } else {
            req.session.userId = result[0].id;
            res.redirect('/biodata');
        }
    } catch (err) {
        console.log(err);
        req.flash('message', "Server Error");
        req.session.message = null;
        res.redirect('/login');
    }
};
