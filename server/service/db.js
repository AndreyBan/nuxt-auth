// import {Client} from 'pg'
//
// const client = new Client({
//     user: 'postgres',
//     host: 'host.docker.internal',
//     database: 'postgres',
//     password: 'root',
//     port: 5432,
// })
// client.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected!");
// });
import Sequilize from 'sequelize'
export const db = new Sequilize(process.env.DB_USER, process.env.DB_NAME, process.env.DB_PASS, {
    host: 'localhost',
    port: process.env.DB_PORT,
    dialect: 'postgres',
    operatorsAliases: 0,
    pool: {
        max: 5,
        min: 0,
        acquire: 3000,
        idle: 10000
    }
})