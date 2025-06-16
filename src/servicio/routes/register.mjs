import express from "express"
import {registrarFirebase} from "../services/service.mjs"
import path from "path"

const router = express.Router()

router.use(express.urlencoded({extended:true}))
router.use(express.json())

router.post("/register",async (req, res)=>{
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    try {
        const result = await registrarFirebase(email, username, password);

        //algun fallo
        if (result.error) {
            return res.status(result.status).json({ message: result.message });
        }

        //todo ok
        res.status(200).json({
            message: "Registro exitoso",
            user: result.user
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Hubo un error al registrar el usuario, intente nuevamente." });
    }
});


export default router