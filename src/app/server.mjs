    import app from "./app.mjs"
import process from "process"

//node --env-file=../../config.env server.mjs 
const port = 4000;

app.listen(port, () => {
    console.log(`Aplicacion corriendo en el puerto ${port}`);
});
