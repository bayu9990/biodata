import express from "express";
import { changeProfilePic, login, regis } from "../controller/user";
import { isLoggedin, logged } from "../middleware/isLogin";
import busboy from "busboy";
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { changeInfo, getData } from "../controller/biodata";

const route = express.Router();

route.get("/", (req, res) => {
  res.render("home");
});

route.post("/login", login);

route.post("/upload", isLoggedin,(req, res,next) => {
    let files;
  const bb = busboy({ headers: req.headers });
  bb.on("file", (fieldname, file, filename, encoding, mimetype) => {
    const uniqueFilename = `${uuidv4()}-${filename.filename}`;
    const dir = path.join(
      __dirname,
      "../public/assets/profile",
      uniqueFilename
    );

    const writeStream = fs.createWriteStream(dir);
    files = `/assets/profile/${uniqueFilename}`
    file.pipe(writeStream);
  });

  bb.on("finish", () => {
    req.unpipe(bb);
    req.profile = files;
    next();
    res.redirect("biodata");
  });

  req.pipe(bb);
},changeProfilePic);

route.get("/login", logged, (req, res) => {
  res.render("login", { message: req.flash("message") });
});

route.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

route.post("/regis", regis);

route.get("/regis", logged, (req, res) => {
  res.render("regis", { message: req.flash("message") });
});

route.get("/biodata", isLoggedin,getData, async (req, res) => {
    res.render("biodata",{info: req.result, date: req.date})
});

route.get("/biodata/profile", isLoggedin,getData, (req, res) => {
  res.render("profile",{info : req.result});
});

route.post('/profile/update',isLoggedin,changeInfo)

export default route;
