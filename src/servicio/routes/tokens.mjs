import express from "express"
import {actualizarTokensFirebase} from "../services/service.mjs"
import path from "path"

const router = express.Router()

router.use(express.urlencoded({extended:true}))
router.use(express.json())

router.post("/tokens", async (req, res) => {
    const { userId, tokens } = req.body;

    if (!userId || tokens === undefined) {
        return res.status(400).json({ message: "Faltan datos requeridos" });
    }

    try {
        const result = await actualizarTokensFirebase(userId, tokens);

        //algun fallo
        if (result.error) {
            return res.status(result.status).json({ message: result.message });
        }

        //todo Ok
        res.status(200).json({
            message: "Tokens actualizados correctamente",
            tokens: result.tokens
        });

    } catch (error) {
        console.error("Error en /tokens:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
});



export default router