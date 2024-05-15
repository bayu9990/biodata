import {Sequelize} from 'sequelize'

export const db = new Sequelize('db_bio','root','',{
    host: 'localhost',
    dialect: 'mysql'
})
