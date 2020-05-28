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
var horario = require('./controllers/validar_horario.js');
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
var menu_opciones_2 = config.menu_opciones_2;
var mjs_horario = config.mjs_horario;
var contenedor = config.contenedor;

var pais = config.pais;
var nomApp = config.nomApp;

app.post('/message', (req, res) => {
	config.obtener_fecha();

	console.log("[Brito] :: [Peticion POST HN /message] :: [FECHA Actual] :: "+config.fecha_actual+" :: [Hora Actual] :: "+config.hora_actual);
	
	var horarios = horario.validarHorario(config.OPEN_HOUR, config.OPEN_MINUTE, config.CLOSE_HOUR, config.CLOSE_MINUTE);

	console.log("[Brito] :: [message] :: [Respuesta de Horario] :: " + horarios);

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

	var bandera_tranferido = false;
	var bandera_fueraHorario = false;
	var nom_grupoACD = "";
	var opcion = "";
	var bandera_opt = true;

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
										opcion = cadena[i];
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

								if(msj_buscar == "configuracion" /*|| msj_buscar == "soporte"*/)
								{
									console.log("[Brito] :: [message] :: [Se crea LocalStrogae para configuracion y soporte] :: " + msj_buscar);
									localStorage.setItem("msj_"+conversationID, msj_buscar);
								}
								else if(msj_buscar == "asesor")
								{
									console.log("[Brito] :: [message] :: [Se crea LocalStrogae para asesor] :: " + msj_buscar);
									localStorage.setItem("msj_"+conversationID, msj_buscar);
								}
								else if(msj_buscar == "cotizar")
								{
									console.log("[Brito] :: [message] :: [Se crea LocalStrogae para Cotizar] :: " + msj_buscar);
									localStorage.setItem("msj_"+conversationID, msj_buscar);
								}            
							}
							else // esite localStorage
							{
								console.log('[Brito] :: [message] :: [Borra Storage] :: ' + localStorage.getItem("msj_"+conversationID));

								var y = parseInt(msj_buscar_opcion);  

								if(localStorage.getItem("msj_"+conversationID) == "configuracion" && msj_buscar == "asesor")
								{
									opcion = "configuracion - asesor";

									if(horarios)
									{
										localStorage.removeItem("msj_"+conversationID);
										result = menu_opciones["2"];
										nom_grupoACD = obtener_ACD(channel, 'c_asesor');
										bandera_tranferido = true;
										bandera = true;
									}
									else
									{
										console.log("[Brito] :: [No cumple horario habil para Configuración en Asesor] :: [horarios] :: "+horarios);
				                        
				                        contenedor.type = "text";
				                        contenedor.accion = "end";
				                        contenedor.queue = "";
				                        contenedor.mensaje = mjs_horario;
				                        result = contenedor;
				                        bandera_fueraHorario = true;
				                        bandera = true;
									}									
								}
								else if((msj_buscar_opcion == "1" || msj_buscar_opcion == "2") && localStorage.getItem("msj_"+conversationID) == "asesor")
								{
									localStorage.removeItem("msj_"+conversationID);

									opcion = "asesor - " + msj_buscar_opcion;

									if(msj_buscar_opcion == "1")
									{
										console.log("[Brito] :: [message] :: [IF] :: " + msj_buscar_opcion);										
										localStorage.setItem("msj_"+conversationID, 'opcion_1_1');
										result = menu_opciones[msj_buscar_opcion];										
									}
									else if(msj_buscar_opcion == "2")
									{
										console.log("[Brito] :: [message] :: [Else] :: " + msj_buscar_opcion);

										if(horarios)
										{											
											result = menu_opciones[msj_buscar_opcion];
											nom_grupoACD = obtener_ACD(channel, 'asesor-2');
											bandera_tranferido = true;
										}
										else
										{	
											console.log("[Brito] :: [No cumple horario habil para Menu_Opciones 2] :: [horarios] :: "+horarios);
					                        contenedor.type = "text";
					                        contenedor.accion = "end";
					                        contenedor.queue = "";
					                        contenedor.mensaje = mjs_horario;
					                        bandera_fueraHorario = true;
					                        result = contenedor;					                        
										}							
									}
									bandera = true;								
								}
								else if((msj_buscar_opcion == "1" || msj_buscar_opcion == "2") && localStorage.getItem("msj_"+conversationID) == "cotizar")
								{
									console.log("[Brito] :: [message] :: [Entro a cotizar] :: " + msj_buscar_opcion + " :: " + localStorage.getItem("msj_"+conversationID));
									localStorage.removeItem("msj_"+conversationID);

									opcion = "cotizar - " + msj_buscar_opcion;
									if(horarios)
									{
										result = menu_opciones_2[msj_buscar_opcion];
										nom_grupoACD = obtener_ACD(channel, 'cotizar-'+msj_buscar_opcion);
										bandera_tranferido = true;
									}
									else
									{	
										console.log("[Brito] :: [No cumple horario habil para Menu_Opciones 2] :: [horarios] :: "+horarios);
				                        contenedor.type = "text";
				                        contenedor.accion = "end";
				                        contenedor.queue = "";
				                        contenedor.mensaje = mjs_horario;
				                        bandera_fueraHorario = true;
				                        result = contenedor;				                        
									}
									bandera = true;																	
								}
								else if((msj_buscar_opcion == "1" || msj_buscar_opcion == "2") && localStorage.getItem("msj_"+conversationID) == "opcion_1_1")
								{
									console.log("[Brito] :: [message] :: [Else IF opcion] :: " + msj_buscar_opcion+ " :: [localStorage] .: " + localStorage.getItem("msj_"+conversationID));
									localStorage.removeItem("msj_"+conversationID);

									opcion = "asesor - 1 - " + msj_buscar_opcion;

									if(horarios)
									{
										result = menu_opciones_2[msj_buscar_opcion];
										nom_grupoACD = obtener_ACD(channel, 'asesor-1-' + msj_buscar_opcion);
										bandera_tranferido = true;
									}
									else
									{	
										console.log("[Brito] :: [No cumple horario habil para Menu_Opciones 2] :: [horarios] :: "+horarios);
				                        contenedor.type = "text";
				                        contenedor.accion = "end";
				                        contenedor.queue = "";
				                        contenedor.mensaje = mjs_horario;
				                        bandera_fueraHorario = true;
				                        result = contenedor;
									}
									bandera = true;
								}
								else if (!isNaN(y) && (localStorage.getItem("msj_"+conversationID) == "asesor" || localStorage.getItem("msj_"+conversationID) == "cotizar" || localStorage.getItem("msj_"+conversationID) == "opcion_1_1"))
				                {
				                	if(localStorage.getItem("msj_"+conversationID) == "asesor")
				                	{
				                		console.log("[Brito] :: [No es el número correcto para el menu de asesor] :: [Número de opción] :: " + y);
										result = palabras['asesor'];
				                	}
				                	else if(localStorage.getItem("msj_"+conversationID) == "opcion_1_1")
				                	{
				                		console.log("[Brito] :: [No es el número correcto para el menu de Opciín 1] :: [Número de opción] :: " + y);
										result = menu_opciones["1"];
				                	}
				                	else if(localStorage.getItem("msj_"+conversationID) == "cotizar")
				                	{
				                		console.log("[Brito] :: [No es el número correcto para el menu de Cotizar] :: [Número de opción] :: " + y);
										result = palabras['cotizar'];
				                	}

									bandera = true;
									bandera_opt = false;
				                }else
				                {
				                	localStorage.removeItem("msj_"+conversationID);
				                }
							}

							var options = {
								'method': 'POST',
								'url': 'https://estadisticasmenubot.mybluemix.net/opcion/insert',
								'headers': {
									'Content-Type': 'application/json'
								},
								body: JSON.stringify(
								{
									"conversacion_id": conversationID,
									"pais": pais,
									"app": nomApp,
									"opcion": opcion,
									"transferencia": bandera_tranferido,
									"fueraHorario": bandera_fueraHorario,
									"grupoACD": nom_grupoACD
								})
							};           

							if(bandera == true && bandera_opt == true)
							{
								request(options, function (error, response)
								{ 
									if (error) throw new Error(error);
									console.log(response.body);
								});
							}
							else{result = msj_dafault; localStorage.removeItem("msj_"+conversationID);}

              				estatus = 200;

				            resultado = {
				                "context":{
									"agent":false,
									"callback":false,
									"video":false
				                },
				                "action":{
									"type": result.accion,// "type":"continue"
									"queue": nom_grupoACD
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

function obtener_ACD(rs, op)
{
	switch (rs)
	{
		case "messenger":
			if('c_asesor' === op || op == "asesor-2")
			{
				return config.cola_opc2_FB; // GT_FB_MSS_SAC
			}
			else if(op == "asesor-1-1" || op == "cotizar-1")
			{
				return config.cola_opc_1_1_FB; // GT_FB_MSS_VENTAS
			}
			else if(op == "asesor-1-2" || op == "cotizar-2")
			{
				return config.cola_opc_1_2_FB; // GT_FB_MSS_SAC
			}
			else{ return "";}
		break;
		case "twitterDM":
			if('c_asesor' === op || op == "asesor-2")
			{
				return config.cola_opc2_TW; // GT_TW_DM_SAC
			}
			else if(op == "asesor-1-1" || op == "cotizar-1")
			{
				return config.cola_opc_1_1_TW; // GT_TW_DM_VENTAS
			}
			else if(op == "asesor-1-2" || op == "cotizar-2")
			{
				return config.cola_opc_1_2_TW; // GT_TW_DM_SAC
			}
			else{ return "";}
		break;
		default:
			if('c_asesor' === op || op == "asesor-2")
			{
				return config.cola_opc2; 
			}
			else if(op == "asesor-1-1" || op == "cotizar-1")
			{
				return config.cola_opc_1_1;
			}
			else if(op == "asesor-1-2" || op == "cotizar-2")
			{
				return config.cola_opc_1_2;
			}
			else{ return "";}
		break;
	}
}

app.get('/:img', function(req, res){
    res.sendFile( `img/${img}` );
}); 

app.get('/', (req, res) => {
	const now = new Date();

	var horarios = horario.validarHorario(config.OPEN_HOUR, config.OPEN_MINUTE, config.CLOSE_HOUR, config.CLOSE_MINUTE);

	console.log("[Brito] :: [Raiz] :: [Respuesta de Horario] :: " + horarios);

	// create Date object for current location
	var d = new Date();
	var offset = config.offset;
	var utc = d.getTime() + (d.getTimezoneOffset() * 60000);
	var nd = new Date(utc + (3600000*offset));

	var respuesta = "Bienvenido al menú Bot de Guatemala, las opciones disponibles son: <br> /message<br> /terminate <br> ";
		respuesta += "Hora del servidor: " + now + " <br> ";
		respuesta += "Hora inicio: " + config.OPEN_HOUR + " - Hora Fin: " + config.CLOSE_HOUR + " <br> ";
		respuesta += "Respuesta del Horario: " + horarios + " <br> ";
		respuesta += "Hora Convertida  " + nd +" <br>";
		respuesta += "Versión: 5.0.0 <br>";

	res.status(200).send(respuesta);
})

http.createServer(app).listen(port, () => {
  console.log('Server started at http://localhost:' + port);
});