import express from "express"
import gamesRoutes from "./games.mjs"
import registerRoutes from "./register.mjs"
import loginRoutes from "./login.mjs"
import deleteRoutes from "./delete.mjs"
import updateTokensRoutes from "./tokens.mjs"
import romsRoutes from "./roms.mjs"
import cors from "cors"; //Preguntar a jose

const router = express.Router()

//Preguntar a jose
router.use(cors({
    origin: 'http://localhost:4000', // Permite solicitudes solo desde el front-end
    methods: ['GET', 'POST', 'DELETE'], // Métodos permitidos
}));


// Página de inicio de la API
router.get("/", (req, res) => {
    res.json({
        message: "¡Bienvenido a la API de CyberArcade!",
        status: "Online",
        version: "1.1",
        description: "API que proporciona acceso a juegos y recursos de CyberArcade.",
        endpoints: {
            games: {
                url: "/api/games",
                method: "GET",
                description: "Obtiene una lista de todos los juegos disponibles.",
            },
            game_by_name: {
                url: "/api/games/{gameName}",
                method: "GET",
                description: "Obtiene los detalles de un juego específico utilizando su nombre.",
            },
            tokens: {
                url: "/api/user/tokens",
                method: "POST",
                description: "Actualiza los tokens de un usuario al jugar un juego y al ver un anuncio.",
            },
            register: {
                url: "/api/user/register",
                method: "POST",
                description: "Registra un nuevo usuario en la plataforma.",
            },
            login: {
                url: "/api/user/login",
                method: "POST",
                description: "Inicia sesión de un usuario con su correo y contraseña.",
            },
            delete: {
                url: "/api/user/delete",
                method: "DELETE",
                description: "Elimina usuario.",
            },
            roms_data: {
                url: "api/romsdata/{filePath}",
                method: "GET",
                description: "Accede a archivos de imágenes, BIOS y ROMs almacenados en el servidor.",
            }
        }
    });
});

//Usuario
router.use("/user", registerRoutes)
router.use("/user", loginRoutes)
router.use("/user", deleteRoutes)
router.use("/user", updateTokensRoutes)
//Juegos
router.use("/games", gamesRoutes)
router.use("/", romsRoutes)

export default router