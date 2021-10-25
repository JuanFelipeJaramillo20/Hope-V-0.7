const {Router} = require("express");
const Paciente = require("../models/paciente");
const axios = require("axios");
const router = Router();

  router.get("/", async (req, res) =>{
      try {
          const Pacientes = await Paciente.find();
          if (!Pacientes) throw new Error("no hay Pacientes")
          res.status(200).json(Pacientes);
      } catch (error) {
          res.status(500).json({message: error.message})
      }
  })

  router.post("/predict/:id", async (req, res) =>{
      const {id} = req.params;
      let pacienteU = await Paciente.findById(id);
      var data = JSON.stringify({
          "Values": [
            [
              pacienteU.examen[0],
              pacienteU.examen[1],
              pacienteU.examen[2],
              pacienteU.examen[3],
              pacienteU.examen[4]
            ]
          ]
        });
        
        var config = {
          method: 'post',
          url: 'https://apibc1.herokuapp.com/predict',
          headers: { 
            'Content-Type': 'application/json'
          },
          data : data
        };
        
        axios(config)
        .then(function (response) {
          res.status(200).json(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
  })

  router.post("/", async (req, res) =>{
      const nuevoPaciente = new Paciente(req.body)
      try {
          const paciente = await nuevoPaciente.save();
          if(!paciente) throw new Error("Hay un error al crear un Paciente");
          res.status(200).json(paciente);
      } catch (error) {
          res.status(500).json({message : error.message})
      }
  })

  router.get("/:id", async (req, res) =>{
    const {id} = req.params;
    try {
        const paciente = await Paciente.findById(id);
        if (!paciente) throw new Error("No se encontró el usuario");
        res.status(200).json(paciente);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

  router.put("/:id", async (req, res) => {

      const {id} = req.params;
      try {
          const respuesta = await Paciente.findByIdAndUpdate(id, req.body);
          if(!respuesta) throw new Error("Hay un error al actualizar el Paciente");
          const actualizado = { ...respuesta._doc, ...req.body}
          res.status(200).json(actualizado);
      } catch (error) {
          res.status(500).json({message: error.message})
      }
  })

  router.delete("/:id", async (req, res) => {
      const {id} = req.params;
      try {
          const eliminado = await Paciente.findByIdAndDelete(id);
          if(!eliminado) throw new Error("Hay un error al eliminar el Paciente");
          res.status(200).json(eliminado)
      } catch (error) {
          res.status(500).json({message: error.message})
      }
  })

  module.exports = router;