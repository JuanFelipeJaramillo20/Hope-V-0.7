const  {Schema, model}  = require("mongoose");


const userSchema=new Schema({

    _id:{type:String, required:true},
    nombres:{type:String, required:true},
    apellidos:{type:String, required:true},
    email: {type: String},
    telefono: {type:String},
    username: {type: String},
    password: {type:String}
});

//convertir a modelo
const user = model('Usuario',userSchema);
module.exports = user