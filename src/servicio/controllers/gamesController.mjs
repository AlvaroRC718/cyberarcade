import {getAll, getByName} from "../models/gamesModel.mjs"

export const getAllGames = async (req, res) => {
    try{
        const games = await getAll()
        res.status(200).json(games); 
    }catch(error){
        res.status(500).json({mensaje: "Error consiguiendo TODOS los datos de videojuegos", error})
    }
}

export const getGamesByName = async (req, res) => {
    try{
        const games = await getByName(req.params.name)
        if(!games){
            return res.status(404).json({mensaje: "Juego no encontrado"})
        }else{
            res.status(200).json(games); 
        }
    }catch(error){
        res.status(500).json({mensaje: `Error consiguiendo los datos del juego ${req.params.name}`, error})
    }
}