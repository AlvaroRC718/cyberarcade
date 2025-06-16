import express from "express"
import {getAllGames, getGamesByName} from "../controllers/gamesController.mjs"

const router = express.Router()

router.get("/", getAllGames)
router.get("/:name", getGamesByName)

export default router