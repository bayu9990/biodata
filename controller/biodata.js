import { QueryTypes } from "sequelize";
import { db } from "../database/db";

export const getData = async (req, res, next) => {
  try {
    await db
      .query(
        "SELECT profile,role,nama,deskripsi,jenis_kelamin,tanggal_lahir,tempat_lahir FROM biodata WHERE user_id = :id",
        {
          type: QueryTypes.SELECT,
          replacements: { id: req.session.userId },
        }
      )
      .then((result) => {
        req.result = result[0];

        const parts = result[0].tanggal_lahir.split("-");
        const year = parts[0];
        const month = parts[1];
        const date = parts[2];

        const formattedDate = `${date}-${month}-${year}`;
        req.date = formattedDate;
        next();
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    console.log(err);
  }
};

export const changeInfo = async(req,res) =>{

  const role = req.body.role;
  const name = req.body.nama;
  const desc = req.body.desc;
  const gender = req.body.gender;
  const birth = req.body.birth;
  const place = req.body.place;

  try {
      await db.query("UPDATE biodata SET role = :role ,nama = :name ,deskripsi = :desc ,jenis_kelamin = :gender ,tanggal_lahir = :birth, tempat_lahir = :place WHERE user_id = :id",{
          replacements : {
              id: req.session.userId,
              role: role,
              name: name,
              desc : desc,
              gender: gender,
              birth : birth,
              place: place,
          },
          type: QueryTypes.UPDATE
      }).then(()=>{
          res.redirect('/biodata')
      }).catch((err)=>{
          console.log(err)
      })
  } catch (error) {
      console.log(error)
  }
}
