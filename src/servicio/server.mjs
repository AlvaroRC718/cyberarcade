import app from "./app.mjs"

//node --env-file=../../config.env server.mjs 
const port = 3000;

app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});
