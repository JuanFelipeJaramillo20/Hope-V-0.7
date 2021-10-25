const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const path = require("path");

const rutasUsuario = require("./routes/usuario");
const rutasPaciente = require("./routes/paciente");

const mongoURI = "mongodb+srv://usuario_admin:kurama99@mintic.umyfk.mongodb.net/Mintic?retryWrites=true&w=majority";


app.use(cors());
app.use(morgan("tiny"));
app.use(bodyParser.json());



mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("Conectado a base de datos Mongo"))
.catch(err => console.log(err));


app.use("/api/user", rutasUsuario);
app.use("/api/paciente", rutasPaciente);
app.use(express.static(path.join(__dirname,"public")));

app.listen(PORT, () => console.log(`App escuchando en http://localhost:${PORT}`));