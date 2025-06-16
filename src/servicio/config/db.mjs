import process from "process"
import mysql from "mysql2/promise"
import path from "path"
import { readFileSync } from "fs"


const actualDir = path.resolve(".")
const rutaCert = path.join(actualDir, "../../ca.pem")
console.log(rutaCert)


let cert = readFileSync(rutaCert)
const pool = mysql.createPool({
    connectionLimit:10,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    charset: "utf8mb4",
    database: process.env.DB_NAME,
    ssl: {
        ca: cert
    }
})

export default pool