import { QueryTypes } from "sequelize";
import { db } from "../database/db";

export const isLoggedin = async (req, res, next) => {
    if(!req.session.userId){
        res.redirect('/login')
    }else{
        try {
            const id = await db.query("SELECT * FROM user WHERE id = :id", {
                type: QueryTypes.SELECT,
                replacements: { id: req.session.userId }
            });
    
            if (!id || id.length === 0 || id[0].id !== req.session.userId) { 
                res.redirect('/login');
            } else {
                next();
            }
        } catch (error) {
            res.redirect('/')
        }
    }
};

export const logged = async(req,res,next) =>{
    if(!req.session.userId){
        next()
    }else{
        try {
            const id = await db.query("SELECT * FROM user WHERE id = :id", {
                type: QueryTypes.SELECT,
                replacements: { id: req.session.userId }
            });
    
            if (!id || id.length === 0 || id[0].id !== req.session.userId) { 
                next()
            } else {
                res.redirect('/biodata');
            }
        } catch (error) {
            res.redirect('/')
        }
    }
}
