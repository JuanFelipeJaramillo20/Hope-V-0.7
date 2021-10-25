const mongoose = require("mongoose");
const Schema=mongoose.Schema;


const pacienteSchema=new Schema({

    nombres:{type:String, required:true},
    apellidos:{type:String, required:true},
    _id:{type:String, required:true},
    examen:[{type: Number}],
    email: {type: String},
    telefono: {type:String}

});

//convertir a modelo
const paciente=mongoose.model('Paciente',pacienteSchema);
module.exports = paciente;