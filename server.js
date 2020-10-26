const horario = require('./controllers/validar_horario.js');
const moment_timezone = require('moment-timezone');
const config = require('./controllers/config.js');
const whatsApp = require('./routes/whatsApp');
const facebook = require('./routes/facebook');
const localStorage = require('localStorage');
const twitter = require('./routes/twitter');
const bodyParser = require('body-parser');
const express = require('express');
const request = require('request');
const moment = require('moment');
const axios = require('axios');
const async = require('async');
const http = require('http');
const util = require('util');
const fs = require('fs');

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(express.static('img'));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

app.use(whatsApp);
app.use(facebook);
app.use(twitter);

app.post('/terminate', (req, res) => {
	var result, resultado;
	var bandera = false , estatus = 200;

	var conversationID = req.body.conversationId;
	var RRSS = req.body.RRSS;
	var canal = req.body.channel;
	var contexto = req.body.context;

	if(RRSS !== '' && typeof RRSS !== "undefined") 
	{
	    if(canal !== '' && typeof canal !== "undefined") 
	    {
	      if(contexto !== '' && typeof contexto !== "undefined") 
	      {
	        estatus = 200;
	        resultado = {
	          "estado": "OK"
	        }
	      }
	      else
	      {
	        estatus = 400;
	        resultado = {
	          "estado": "El valor de contexto es requerido"
	        }
	      }
	    }
	    else
	    {
	      estatus = 400;
	      resultado = {
	        "estado": "El valor de canal es requerido"
	      }
	    } 
	}
	else
	{
		estatus = 400;
	    resultado = {
	      "estado": "El valor de RRSS es requerido"
	    }
	} 

  res.status(estatus).json(resultado);
})

app.get('/:img', function(req, res){
    res.sendFile( `img/${img}` );
});

app.get('/', (req, res) => {

	var horario_WA = horario.validarHorario_WA();
	var horario_FB = horario.validarHorario_FB();
	var horario_TW = horario.validarHorario_TW();

	var now = moment();
	var fecha_actual = now.tz("America/Guatemala").format("YYYY-MM-DD HH:mm:ss");
	var anio = now.tz("America/Guatemala").format("YYYY");

	var respuesta = "Bienvenido al menú Bot de <strong>Guatemala</strong>, las opciones disponibles son: <br>";
		respuesta += '<ul> <li> <strong> WhastApp: "/wa/message" </strong> </li>';
		respuesta += '<li> <strong> Facebbok MSS: "/fb/message" </strong> </li>';
		respuesta += '<li> <strong> Twitter DM: "/tw/message" </strong> </li> </ul>';
		respuesta += "Horario de atención para <strong>WhastApp</strong> es: <br> ";
		respuesta += "Hora inicio: " + config.horario_WA.OPEN_HOUR + " - Hora Fin: " + config.horario_WA.CLOSE_HOUR + " <br> ";
		respuesta += "Respuesta del Horario: " + horario_WA + " <br> <br> ";
		respuesta += "Horario de atención para <strong>Facebook Messenger</strong> es: <br> ";		
		respuesta += "Hora inicio: " + config.horario_FB.OPEN_HOUR + " - Hora Fin: " + config.horario_FB.CLOSE_HOUR + " <br> ";
		respuesta += "Respuesta del Horario: " + horario_FB + " <br> <br> ";
		respuesta += "Horario de atención para <strong>Twitter DM</strong> es: <br> ";		
		respuesta += "Hora inicio: " + config.horario_TW.OPEN_HOUR + " - Hora Fin: " + config.horario_TW.CLOSE_HOUR + " <br> ";
		respuesta += "Respuesta del Horario: " + horario_TW + " <br> <br> ";
		respuesta += "Hora actual de <strong>Guatemala</strong>:  " + fecha_actual +" <br>";
		respuesta += "<strong> Sixbell "+anio+" - Versión: "+config.info.version+" </strong><br>";

	res.status(200).send(respuesta);
});

http.createServer(app).listen(config.puerto, () => {
  console.log('Server started at http://localhost:' + config.puerto);
});