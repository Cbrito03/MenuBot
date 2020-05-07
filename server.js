var express = require('express')
var http = require('http')
var app = express()
var request = require('request')
var async = require('async')
var bodyParser = require('body-parser');
var localStorage = require('localStorage')
let fs = require('fs');
var util = require('util');
var config = require('./config.js');
var port = 8080;

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

var palabras = config.palabras;
var msj_dafault = config.msj_default;
var menu_opciones = config.menu_opciones;
var menu_opciones_2 = config.menu_opciones_2

app.post('/message', (req, res) => {
	config.obtener_fecha();
	console.log("Peticion POST /message [FECHA-HORA] : "+config.fecha_actual+" "+config.hora_actual);  
	var result, resultado;
	var bandera = false , estatus = 200;
	var msj_buscar = "", msj_buscar_opcion = "";

	var apiVersion = req.body.apiVersion;
	var conversationID = req.body.conversationId;
	var authToken = req.body.authToken;
	var channel = req.body.channel;
	var user = req.body.user;
	var context = req.body.context;
	var cadena = req.body.message;
  
	if(apiVersion !== '' && typeof apiVersion !== "undefined") 
	{
		if(authToken !== '' && typeof authToken !== "undefined") 
		{
			if(channel !== '' && typeof channel !== "undefined") 
			{
				if(user !== '' && typeof user !== "undefined") 
				{
					if(context !== '' && typeof context !== "undefined") 
					{
						if(cadena !== '' && typeof cadena !== "undefined") 
						{
							cadena = cadena.text.toLowerCase(); // minusculas
							cadena = cadena.trim();
							msj_buscar_opcion = cadena;
							cadena = cadena.replace(/,/g,"").replace(/;/g,"").replace(/:/g,"").replace(/\./g,""); // borramos ,;.:
							cadena = cadena.split(" "); // lo convertimo en array mediante los espacios

							for(var i = 0; i < cadena.length; i++)
							{
								for(var atr in palabras)
								{
									if(cadena[i] === "configuración"){ cadena[i] = 'configuracion'}

									if(atr.toLowerCase() === cadena[i])
									{
										msj_buscar = cadena[i];

										result = palabras[atr];                    

										bandera = true;

										break;
									}
								}      
								if(bandera){ break; }
							}

							console.log("[Brito] :: [message] :: [msj_buscar_opcion] :: " + msj_buscar_opcion);

							if(localStorage.getItem("msj_"+conversationID) == null) // No existe
							{
								console.log('Crea Storage :: ' + localStorage.getItem("msj_"+conversationID));

								if(msj_buscar == "configuracion" || msj_buscar == "soporte")
								{
									localStorage.setItem("msj_"+conversationID, msj_buscar);
								}
								else if(msj_buscar == "asesor")
								{
									localStorage.setItem("msj_"+conversationID, msj_buscar);
								}             
							}
							else // esite localStorage
							{
								console.log('[Brito] :: [message] :: [Borra Storage] :: ' + localStorage.getItem("msj_"+conversationID));

								var y = parseInt(msj_buscar_opcion);  

								if((localStorage.getItem("msj_"+conversationID) == "configuracion" || localStorage.getItem("msj_"+conversationID) == "soporte") && msj_buscar == "asesor")
								{
									localStorage.removeItem("msj_"+conversationID);
									result = menu_opciones["2"];
									bandera = true;
								}
								else if((msj_buscar_opcion == "1" || msj_buscar_opcion == "2") && localStorage.getItem("msj_"+conversationID) == "asesor")
								{
									if(msj_buscar_opcion == "1")
									{
										console.log("[Brito] :: [message] :: [IF] :: " + msj_buscar_opcion);
										localStorage.removeItem("msj_"+conversationID);
										localStorage.setItem("msj_"+conversationID, 'opcion_1_1');

										result = menu_opciones[msj_buscar_opcion];
										bandera = true;
									}
									else if(msj_buscar_opcion == "2")
									{
										console.log("[Brito] :: [message] :: [Else] :: " + msj_buscar_opcion);
										localStorage.removeItem("msj_"+conversationID);
										result = menu_opciones[msj_buscar_opcion];
										bandera = true;										
									}									
								}
								else if((msj_buscar_opcion == "1" || msj_buscar_opcion == "2") && localStorage.getItem("msj_"+conversationID) == "opcion_1_1")
								{
									console.log("[Brito] :: [message] :: [Else IF opcion] :: " + msj_buscar_opcion+ " :: [localStorage] .: " + localStorage.getItem("msj_"+conversationID));
									localStorage.removeItem("msj_"+conversationID);
									result = menu_opciones_2[msj_buscar_opcion];
									bandera = true;
								}
								else if (!isNaN(y) && (localStorage.getItem("msj_"+conversationID) == "asesor" || localStorage.getItem("msj_"+conversationID) == "opcion_1_1"))
				                {
				                	if(localStorage.getItem("msj_"+conversationID) == "asesor")
				                	{
				                		console.log("[Brito] :: [No es el número correcto para el menu de asesor] :: [Número de opción] :: " + y);
										result = palabras['asesor'];
										bandera = true;
				                	}
				                	else if(localStorage.getItem("msj_"+conversationID) == "opcion_1_1")
				                	{
				                		console.log("[Brito] :: [No es el número correcto para el menu de Opciín 1] :: [Número de opción] :: " + y);
										result = menu_opciones["1"];
										bandera = true;
				                	}
				                }
							}               

							if(!bandera){ result = msj_dafault; localStorage.removeItem("msj_"+conversationID);}

              				estatus = 200;

				            resultado = {
				                "context":{
									"agent":false,
									"callback":false,
									"video":false
				                },
				                "action":{
									"type": result.accion,// "type":"continue"
									"queue": result.queue
				                },
				                "messages":[{
									"type": result.type,
									"text": result.mensaje,
									"mediaURL": result.mediaURL
								}],
				                "additionalInfo": {
									"key":"RUT",
									"RUT":"1-9"
				                }
				            };

				            if( result.mensaje === ""){resultado.messages = [];}

				            console.log("[Brito] :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: [Brito]");
            			}
           		 		else
			            {
			              estatus = 400;
			              resultado = {
			                "estado": "El valor de mensaje es requerido"
			              }
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
						"estado": "El valor de user es requerido"
					}
				}        
			}
			else
			{
				estatus = 400;
				resultado = {
					"estado": "El valor de channel es requerido"
				}
			} 
		}
		else
		{
			estatus = 400;
			resultado = {
				"estado": "El valor de authToken es requerido"
			}
		}
	}
	else
	{
		estatus = 400;
		resultado = {
			"estado": "El valor de apiVersion es requerido"
		}
	}

 	res.status(estatus).json(resultado);
})

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
	var respuesta = "Bienvenido al menú Bot de Guatemala, las opciones disponibles son: <br> /message<br> /terminate <br> ";
	respuesta += "Versión: 3.0.0 <br>";
	res.status(200).send(respuesta);
})

http.createServer(app).listen(port, () => {
  console.log('Server started at http://localhost:' + port);
});

