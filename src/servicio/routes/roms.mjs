import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const router = express.Router();


const __dirname = path.dirname(fileURLToPath(import.meta.url));

//Mandamos las roms y sus imagenes como contenido estatico
router.use("/romsdata", express.static(path.join(__dirname, "../public")));

export default router;
