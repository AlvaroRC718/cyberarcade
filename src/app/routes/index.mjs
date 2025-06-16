import express from "express"
import path from "path"

const router = express.Router()


// Rutas para las vistas principales
router.get("/", (req, res) => {
    res.sendFile(path.join(path.resolve(), "views/index.html"));
});

router.get("/index", (req, res) => {
    res.sendFile(path.join(path.resolve(), "views/index.html"));
});

router.get("/contact", (req, res) => {
    res.sendFile(path.join(path.resolve(), "views/contact.html"));
});

router.get("/events", (req, res) => {
    res.sendFile(path.join(path.resolve(), "views/events.html"));
});

router.get("/games", (req, res) => {
    res.sendFile(path.join(path.resolve(), "views/games.html"));
});

router.get("/register", (req, res) => {
    res.sendFile(path.join(path.resolve(), "views/register.html"));
});

router.get("/login", (req, res) => {
    res.sendFile(path.join(path.resolve(), "views/login.html"));
});

router.get("/play", (req, res) => {
    res.sendFile(path.join(path.resolve(), "views/play.html"));
});

router.get("/profile", (req, res) => {
    res.sendFile(path.join(path.resolve(), "views/profile.html"));
});

router.get("/addtokens", (req, res) => {
    res.sendFile(path.join(path.resolve(), "views/addtokens.html"));
});

router.get("/fran", (req, res) => {
    res.sendFile(path.join(path.resolve(), "views/fran.html"));
});


export default router