import express from "express"
import path from "path";
import index_routes from "./routes/index.mjs"
import process from "process"

const app = express()

// Middlewares globales
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//carpeta pública para archivos estáticos para poder visualizar css...
//Es importante que este por debajo de los middleware porque si no, no se mostrara en los routes
const publicPath = path.join(path.resolve("."), "public");
app.use(express.static(publicPath));

// Rutas
// establece un prefijo común, todas las rutas deben comenzar por /api
app.use("/", index_routes) 

export default app