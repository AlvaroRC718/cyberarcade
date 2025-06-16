import express from "express"
import path from "path"
import { comprobarLoginFirebase } from "../services/service.mjs"

const router = express.Router()

router.use(express.urlencoded({ extended: true }))
router.use(express.json())

router.post("/login", async (req, res) => {
    const email = req.body.email
    const password = req.body.password
    try {
        const result = await comprobarLoginFirebase(email, password);

        //algun fallo
        if (result.error) {
            return res.status(result.status).json({ message: result.message });
        }

        //todo ok
        res.status(200).json({
            message: "Login exitoso",
            user: result.user
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Hubo un error en el proceso de login" });
    }
})


export default router