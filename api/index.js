const express = require('express');// es el framework sirve para crear el servidor web 
const bodyParse = require("body-parser");
const jwt = require("jsonwebtoken"); //
const {config} = require("./config");
const bodyParser = require('body-parser');

const app = express();


//Habilitar CORS para los request especificos de un cliente (Recomendado para producción)
/*
const corsOptions = { origin: "http://example.com" };
app.use(cors(corsOptions))
*/
app.use(cors())

// body parser
app.use(bodyParser.json()); // se utiliza para analizar los cuerpos de las solicitudes entrantes con formato JSON.

app.post("/api/auth/token", function(req,res){
    const {email, username, name} = req.body;
    const token = jwt.sign({ sub: username, email, name}, config.authJwtSecret);
    res.json({access_token: token});
    
}
);

app.get("/api/auth/verify", function(req,res,next){
    const { access_token} = req.query;

    try { 
        const decoded = jwt.verify(access_token, config.authJwtSecret);
        res.json({ message: " the access token is valid", username: decoded.sub})
    } catch (err) {
        next(err);
    }
})

const server = app.listen(5000,function(){
    console.log(`listening http://localhost:${server.address().port}`); //el servidor se inicia en el puerto 5000 y se muestra un mensaje en la consola indicando que el servidor está en ejecución.

});
