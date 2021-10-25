const {Router} = require("express");
const Usuario = require("../models/usuario");

const router = Router();

router.get("/", async (req, res) =>{
    try {
        const usuarios = await Usuario.find();
        if (!usuarios) throw new Error("no hay usuarios")
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

router.get("/:id", async (req, res) =>{
    const {id} = req.params;
    try {
        const usuario = await Usuario.findById(id);
        if (!usuario) throw new Error("No se encontró el usuario");
        res.status(200).json(usuario);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

router.post("/", async (req, res) =>{
    const nuevoUser = new Usuario(req.body)
    try {
        const user = await nuevoUser.save();
        if(!user) throw new Error("Hay un error al crear un usuario");
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({message : error.message})
    }
})

router.put("/:id", async (req, res) => {

    const {id} = req.params;
    try {
        const respuesta = await Usuario.findByIdAndUpdate(id, req.body);
        if(!respuesta) throw new Error("Hay un error al actualizar el usuario");
        const actualizado = { ...respuesta._doc, ...req.body}
        res.status(200).json(actualizado);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

router.delete("/:id", async (req, res) => {
    const {id} = req.params;
    try {
        const eliminado = await Usuario.findByIdAndDelete(id);
        if(!eliminado) throw new Error("Hay un error al eliminar el Paciente");
        res.status(200).json(eliminado)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

module.exports = router;