import express from "express"
import index_routes from "./routes/index.mjs"

const app = express()

// Middlewares globales
app.use(express.json())
app.use(express.urlencoded({extended:true}))

// Rutas
// establece un prefijo común, todas las rutas deben comenzar por /api
app.use("/api", index_routes) 

app.get("/", (req, res) => {
    res.redirect("/api");
});

export default app