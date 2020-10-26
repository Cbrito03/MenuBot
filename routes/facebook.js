const horario = require('../controllers/validar_horario.js');
const moment_timezone = require('moment-timezone');
const msj_fb = require('../controllers/msj_FB.js');
const config = require('../controllers/config.js');
const localStorage = require('localStorage');
const express = require('express');
const moment = require('moment');
const axios = require('axios');
const async = require('async');

const router = express.Router();

router.post('/fb/message', async (req, res) => {
  console.log("[Brito] :: [Peticion POST FB_GT /message]");
  
  var horarios = horario.validarHorario_WA();

  var resultado, result_messages, result_action;
  var bandera = false , estatus = 200;
  var opcion = "", msj_buscar = "", msj_buscar_opcion = "";

  var apiVersion = req.body.apiVersion;
  var conversationID = req.body.conversationId;
  var authToken = req.body.authToken;
  var channel = req.body.channel;
  var user = req.body.user;
  var context = req.body.context;
  var cadena = req.body.message;

  var bandera_tranferido = false;
  var bandera_fueraHorario = false;
  var bandera_opt = true;

  console.log("[context] :: ");
  console.log(context);

  var bandera_TIMEOUT = false;

  var now = moment();
  var fechaStamp = moment(context.lastInteractionFinishTime).format("YYYY-MM-DD HH:mm:ss");
  var fecha_actual = now.tz("America/Costa_Rica").format("YYYY-MM-DD HH:mm:ss");
  var fecha2 = moment(fecha_actual, "YYYY-MM-DD HH:mm:ss");

  console.log("fechaStamp :: " + fechaStamp);

  var diff = fecha2.diff(fechaStamp, 'h'); 
  console.log("diff :: " + diff);
  console.log(typeof diff);

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
              if(context.lastInteractionFinishType !== "CLIENT_TIMEOUT")
              {             
                bandera_TIMEOUT = true;
              }             
              else if(context.lastInteractionFinishType == "CLIENT_TIMEOUT" && diff <= 24)
              {
                bandera_TIMEOUT = false;
              }
              else if(context.lastInteractionFinishType == "CLIENT_TIMEOUT" && diff > 24)
              {
                bandera_TIMEOUT = true;
              }

              if(bandera_TIMEOUT)
              {
                cadena = cadena.text.toLowerCase(); // minusculas
                cadena = cadena.trim();
                msj_buscar_opcion = cadena;
                cadena = cadena.replace(/,/g,"").replace(/;/g,"").replace(/:/g,"").replace(/\./g,""); // borramos ,;.:
                cadena = cadena.split(" "); // lo convertimo en array mediante los espacios

                for(var i = 0; i < cadena.length; i++)
                {
                  for(var atr in msj_fb.palabras)
                  {                 
                    if(cadena[i] === "factura" || cadena[i] === "asistencia" || cadena[i] === "precio"){ localStorage.removeItem("msj_"+conversationID); }

                    if(atr.toLowerCase() === cadena[i])
                    {
                      opcion = cadena[i];
                      msj_buscar = cadena[i];
                      result_action = msj_fb.palabras[atr].action;
                      result_messages = msj_fb.palabras[atr].messages;                    
                      bandera = true;
                      bandera_opt = true;
                      break;
                    }
                  }      
                  if(bandera){ break; }
                }

                console.log("[Brito] :: [message] :: [msj_buscar_opcion] :: " + msj_buscar_opcion);

                if(localStorage.getItem("msj_"+conversationID) == null) // No existe localStorage
                {
                  if(msj_buscar == "factura" || msj_buscar == "asistencia" || msj_buscar == "precio")
                  {
                    localStorage.setItem("msj_"+conversationID, msj_buscar);
                    console.log('[Brito] :: [message] :: [Se crea LocalStrogae para '+msj_buscar+'] :: ', localStorage.getItem("msj_"+conversationID));
                  }               
                  else if(msj_buscar == "cotizar")
                  {
                    localStorage.setItem("msj_"+conversationID, msj_buscar);
                    console.log('[Brito] :: [message] :: [Se crea LocalStrogae para cotizar] :: ', localStorage.getItem("msj_"+conversationID));
                  }
                  else if(msj_buscar == "estado")
                  {
                    localStorage.setItem("msj_"+conversationID, msj_buscar);
                    console.log('[Brito] :: [message] :: [Se crea LocalStrogae para estado] :: ', localStorage.getItem("msj_"+conversationID));
                  }
                  else if(msj_buscar == "asesor")
                  {
                    localStorage.setItem("msj_"+conversationID, msj_buscar);
                    console.log('[Brito] :: [message] :: [Se crea LocalStrogae para asesor] :: ', localStorage.getItem("msj_"+conversationID));
                  }
                  else if(msj_buscar == "datos")
                  {
                    localStorage.setItem("msj_"+conversationID, msj_buscar);
                    console.log('[Brito] :: [message] :: [Se crea LocalStrogae para datos] :: ', localStorage.getItem("msj_"+conversationID));
                  }
                  else if(!bandera)
                  {
                    result_messages = msj_fb.msj_default.messages;
                    result_action = msj_fb.msj_default.action;
                  }  
                }
                else // esite localStorage
                {
                  
                  console.log('[Brito] :: [message] :: [Borra Storage] :: ' + localStorage.getItem("msj_"+conversationID));
                  
                  var y = parseInt(msj_buscar_opcion);
                  var msj_storage = localStorage.getItem("msj_"+conversationID);

                  console.log('[Brito] :: [message] :: [msj_storage] :: ' + msj_storage + ' :: [msj_buscar_opcion] :: ' + msj_buscar_opcion);

                  if(( msj_storage == "factura" || msj_storage == "asistencia" || msj_storage == "precio" ) && msj_buscar == "asesor")
                  {
                    opcion = msj_storage + " - asesor";

                    localStorage.removeItem("msj_"+conversationID);

                    if(config.horario_24_7 == true || horarios)
                    {
                      if(msj_storage == "factura")
                      {
                        result_messages = msj_fb.msj_factura_asesor.messages;
                        result_action = msj_fb.msj_factura_asesor.action;
                      } 
                      else if(msj_storage == "asistencia")
                      {
                        result_messages = msj_fb.msj_asistencia_asesor.messages;
                        result_action = msj_fb.msj_asistencia_asesor.action;
                      }
                      else if(msj_storage == "precio")
                      {
                        result_messages = msj_fb.msj_precio_asesor.messages;
                        result_action = msj_fb.msj_precio_asesor.action;
                      }                                       
                      bandera_tranferido = true;  
                    }
                    else
                    {
                      console.log("[Brito] :: [No cumple horario habil para Configuración en Asesor] :: [horarios] :: "+horarios);
                      localStorage.removeItem("msj_"+conversationID+"_horario");
                      localStorage.setItem("msj_"+conversationID+"_horario", "fueraHorario");
                      result_messages = msj_fb.msj_fuera_horario.messages;
                      result_action = msj_fb.msj_fuera_horario.action;                                      
                      bandera_fueraHorario = true;                                
                    }

                    bandera_opt = true;
                    bandera = true;               
                  }
                  else if((msj_buscar_opcion == "1" || msj_buscar_opcion == "2") && localStorage.getItem("msj_"+conversationID) == "cotizar")
                  {
                    console.log("[Brito] :: [message] :: [Entro a cotizar] :: " + msj_buscar_opcion + " :: " + localStorage.getItem("msj_"+conversationID));
                    
                    localStorage.removeItem("msj_"+conversationID);

                    opcion = "cotizar - " + msj_buscar_opcion;

                    if(config.horario_24_7 == true || horarios)
                    {
                      result_messages = msj_fb.menu_opciones_cotizar[msj_buscar_opcion].messages;
                      result_action = msj_fb.menu_opciones_cotizar[msj_buscar_opcion].action;
                      bandera_tranferido = true;
                    }
                    else
                    { 
                      console.log("[Brito] :: [No cumple horario habil] :: [horarios] :: "+horarios);
                      localStorage.removeItem("msj_"+conversationID+"_horario");
                      localStorage.setItem("msj_"+conversationID+"_horario", "fueraHorario");
                      result_messages = msj_fb.msj_fuera_horario.messages;
                      result_action = msj_fb.msj_fuera_horario.action;                                      
                      bandera_fueraHorario = true;                            
                    }

                    bandera = true;
                    bandera_opt = true;                               
                  }
                  else if((msj_buscar_opcion == "1" || msj_buscar_opcion == "2") && localStorage.getItem("msj_"+conversationID) == "estado")
                  {
                    console.log("[Brito] :: [message] :: [Entro a estado] :: " + msj_buscar_opcion + " :: " + localStorage.getItem("msj_"+conversationID));
                    
                    localStorage.removeItem("msj_"+conversationID);

                    opcion = "estado - " + msj_buscar_opcion;

                    if(config.horario_24_7 == true || horarios)
                    {
                      result_messages = msj_fb.menu_opciones_estado[msj_buscar_opcion].messages;
                      result_action = msj_fb.menu_opciones_estado[msj_buscar_opcion].action;
                      bandera_tranferido = true;
                    }
                    else
                    { 
                      console.log("[Brito] :: [No cumple horario habil] :: [horarios] :: "+horarios);
                      localStorage.removeItem("msj_"+conversationID+"_horario");
                      localStorage.setItem("msj_"+conversationID+"_horario", "fueraHorario");
                      result_messages = msj_fb.msj_fuera_horario.messages;
                      result_action = msj_fb.msj_fuera_horario.action;                                      
                      bandera_fueraHorario = true;                            
                    }

                    bandera = true;
                    bandera_opt = true;                               
                  }
                  else if((msj_buscar_opcion == "1" || msj_buscar_opcion == "2") && localStorage.getItem("msj_"+conversationID) == "asesor")
                  {
                    localStorage.removeItem("msj_"+conversationID);

                    opcion = "asesor - " + msj_buscar_opcion;

                    if(msj_buscar_opcion == "1")
                    {
                      console.log("[Brito] :: [message] :: [IF] :: " + msj_buscar_opcion);                    
                      localStorage.setItem("msj_"+conversationID, 'opcion_1_1');                    
                      result_messages = msj_fb.menu_opciones_asesor[msj_buscar_opcion].messages;
                      result_action = msj_fb.menu_opciones_asesor[msj_buscar_opcion].action;
                    }
                    else if(msj_buscar_opcion == "2")
                    {
                      console.log("[Brito] :: [message] :: [Else] :: " + msj_buscar_opcion);

                      if(config.horario_24_7 == true || horarios)
                      {                     
                        result_messages = msj_fb.menu_opciones_asesor[msj_buscar_opcion].messages;
                        result_action = msj_fb.menu_opciones_asesor[msj_buscar_opcion].action;
                        bandera_tranferido = true;
                      }
                      else
                      { 
                        console.log("[Brito] :: [No cumple horario habil para Asesor opcion 2] :: [horarios] :: "+horarios);
                        localStorage.removeItem("msj_"+conversationID+"_horario");
                        localStorage.setItem("msj_"+conversationID+"_horario", "fueraHorario");
                        result_messages = msj_fb.msj_fuera_horario.messages;
                        result_action = msj_fb.msj_fuera_horario.action;                                      
                        bandera_fueraHorario = true;                                  
                      }             
                    }
                    bandera = true;
                    bandera_opt = true;             
                  }
                  else if((msj_buscar_opcion == "1" || msj_buscar_opcion == "2") && localStorage.getItem("msj_"+conversationID) == "datos")
                  {
                    localStorage.removeItem("msj_"+conversationID);

                    opcion = "datos - " + msj_buscar_opcion;

                    if(msj_buscar_opcion == "1")
                    {
                      console.log("[Brito] :: [message] :: [IF] :: " + msj_buscar_opcion);                    
                      localStorage.setItem("msj_"+conversationID, 'datos_1_1');                   
                      result_messages = msj_fb.menu_opciones_asesor[msj_buscar_opcion].messages;
                      result_action = msj_fb.menu_opciones_asesor[msj_buscar_opcion].action;
                    }
                    else if(msj_buscar_opcion == "2")
                    {
                      console.log("[Brito] :: [message] :: [Else] :: " + msj_buscar_opcion);

                      if(config.horario_24_7 == true || horarios)
                      {                     
                        result_messages = msj_fb.menu_opciones_asesor[msj_buscar_opcion].messages;
                        result_action = msj_fb.menu_opciones_asesor[msj_buscar_opcion].action;
                        bandera_tranferido = true;
                      }
                      else
                      { 
                        console.log("[Brito] :: [No cumple horario habil para Asesor opcion 2] :: [horarios] :: "+horarios);
                        localStorage.removeItem("msj_"+conversationID+"_horario");
                        localStorage.setItem("msj_"+conversationID+"_horario", "fueraHorario");
                        result_messages = msj_fb.msj_fuera_horario.messages;
                        result_action = msj_fb.msj_fuera_horario.action;                                      
                        bandera_fueraHorario = true;                                  
                      }             
                    }
                    bandera = true;
                    bandera_opt = true;             
                  }             
                  else if((msj_buscar_opcion == "1" || msj_buscar_opcion == "2") && localStorage.getItem("msj_"+conversationID) == "opcion_1_1")
                  {
                    console.log("[Brito] :: [message] :: [Else IF opcion] :: " + msj_buscar_opcion+ " :: [localStorage] .: " + localStorage.getItem("msj_"+conversationID));
                    localStorage.removeItem("msj_"+conversationID);

                    opcion = "asesor - 1 - " + msj_buscar_opcion;

                    if(config.horario_24_7 == true || horarios)
                    {
                      result_messages = msj_fb.subMenu_opciones_asesor_op1[msj_buscar_opcion].messages;
                      result_action = msj_fb.subMenu_opciones_asesor_op1[msj_buscar_opcion].action;
                      bandera_tranferido = true;
                    }
                    else
                    { 
                      console.log("[Brito] :: [No cumple horario habil de asesor opcion 1_1] :: [horarios] :: "+horarios);
                      localStorage.removeItem("msj_"+conversationID+"_horario");
                      localStorage.setItem("msj_"+conversationID+"_horario", "fueraHorario");
                      result_messages = msj_fb.msj_fuera_horario.messages;
                      result_action = msj_fb.msj_fuera_horario.action;                                      
                      bandera_fueraHorario = true;
                    }
                    bandera = true;
                    bandera_opt = true;
                  }
                  else if((msj_buscar_opcion == "1" || msj_buscar_opcion == "2") && localStorage.getItem("msj_"+conversationID) == "datos_1_1")
                  {
                    console.log("[Brito] :: [message] :: [Else IF opcion] :: " + msj_buscar_opcion+ " :: [localStorage] .: " + localStorage.getItem("msj_"+conversationID));
                    localStorage.removeItem("msj_"+conversationID);

                    opcion = "datos - 1 - " + msj_buscar_opcion;

                    if(config.horario_24_7 == true || horarios)
                    {
                      result_messages = msj_fb.subMenu_opciones_datos_op1[msj_buscar_opcion].messages;
                      result_action = msj_fb.subMenu_opciones_datos_op1[msj_buscar_opcion].action;
                      bandera_tranferido = true;
                    }
                    else
                    { 
                      console.log("[Brito] :: [No cumple horario habil de datos opcion 1_1] :: [horarios] :: "+horarios);
                      localStorage.removeItem("msj_"+conversationID+"_horario");
                      localStorage.setItem("msj_"+conversationID+"_horario", "fueraHorario");
                      result_messages = msj_fb.msj_fuera_horario.messages;
                      result_action = msj_fb.msj_fuera_horario.action;                                      
                      bandera_fueraHorario = true;
                    }
                    bandera = true;
                    bandera_opt = true;
                  }
                  else if (!isNaN(y) && (localStorage.getItem("msj_"+conversationID) == "asesor" || localStorage.getItem("msj_"+conversationID) == "cotizar" || localStorage.getItem("msj_"+conversationID) == "estado" || localStorage.getItem("msj_"+conversationID) == "opcion_1_1" || localStorage.getItem("msj_"+conversationID) == "datos_1_1"))
                  {
                    if(localStorage.getItem("msj_"+conversationID) == "asesor" || localStorage.getItem("msj_"+conversationID) == "datos")
                    {
                      console.log("[Brito] :: [No es el número correcto para el menu de asesor] :: [Número de opción] :: " + y);
                      opcion = "asesor";
                      result_action = msj_fb.palabras[opcion].action;
                      result_messages = msj_fb.palabras[opcion].messages;
                    }
                    else if(localStorage.getItem("msj_"+conversationID) == "opcion_1_1")
                    {
                      console.log("[Brito] :: [No es el número correcto para el menu de Opciín 1] :: [Número de opción] :: " + y);
                      opcion = "asesor-1";
                      result_action = msj_fb.menu_opciones_asesor["1"].action;
                      result_messages = msj_fb.menu_opciones_asesor["1"].messages;
                    }
                    else if(localStorage.getItem("msj_"+conversationID) == "datos_1_1")
                    {
                      console.log("[Brito] :: [No es el número correcto para el menu de Opciín 1] :: [Número de opción] :: " + y);
                      opcion = "asesor-1";
                      result_action = msj_fb.menu_opciones_datos["1"].action;
                      result_messages = msj_fb.menu_opciones_datos["1"].messages;
                    }
                    else if(localStorage.getItem("msj_"+conversationID) == "cotizar" || localStorage.getItem("msj_"+conversationID) == "estado")
                    {
                      console.log("[Brito] :: [No es el número correcto para el menu de Cotizar] :: [Número de opción] :: " + y);
                      opcion = "cotizar";
                      result_action = msj_fb.palabras[opcion].action;
                      result_messages = msj_fb.palabras[opcion].messages;
                    }

                    bandera = true;
                    bandera_opt = false;
                  }else
                  {
                    localStorage.removeItem("msj_"+conversationID);

                    if(!bandera)
                    {
                      result_messages = msj_fb.msj_default.messages;
                      result_action = msj_fb.msj_default.action;
                    }
                  }
                }

                if((msj_buscar_opcion == "llamarme" || msj_buscar_opcion == "whatsapp") && localStorage.getItem("msj_"+conversationID+"_horario") == "fueraHorario")
                {
                  console.log("[Brito] :: [message] :: [Else IF fueraHorario] :: " + msj_buscar_opcion);
                  localStorage.removeItem("msj_"+conversationID+"_horario");

                  opcion = "FueraHorario - " + msj_buscar_opcion;
                  
                  result_messages = msj_fb.menu_fueraHorario[msj_buscar_opcion].messages;
                  result_action = msj_fb.menu_fueraHorario[msj_buscar_opcion].action;               
                  bandera_tranferido = true;                
                  bandera = true;
                  bandera_opt = true;
                }             

                var options = {
                  method : 'post',
                  url : config.url_estd,
                  headers : { 'Content-Type': 'application/json'},
                  data: JSON.stringify({
                    "conversacion_id" : conversationID,
                    "pais" : config.info.pais,
                    "app" : config.info.nomApp,
                    "opcion" : opcion,
                    "rrss" : "FB",
                    "transferencia" : bandera_tranferido,
                    "fueraHorario" : bandera_fueraHorario,
                    "grupoACD" : result_action.queue        
                  })
                };          

                if(bandera == true)
                {
                  if(bandera_opt)
                  {
                    console.log(options);
                    var resultado_axios = await axios(options);
                    console.log("[Resultado AXIOS] :: ");
                    console.log(resultado_axios);
                  }                 
                }
                else
                {
                  localStorage.removeItem("msj_"+conversationID);
                  result_messages = msj_fb.msj_default.messages;
                  result_action = msj_fb.msj_default.action;
                }

                console.log("[Brito] :: [channel] :: ", channel, " :: [opcion] :: ", opcion);
                                
                resultado = {
                  "context": context,
                  "action": result_action,
                  "messages": result_messages,
                  "additionalInfo": {
                    "key":"RUT",
                    "RUT":"1-9"
                  }
                }
              }
              else
              {
                resultado = {
                  "context": context,
                  "action": {
                    "type" : "transfer",
                      "queue" : context.lastInteractionQueue,
                  },
                  "messages": [],
                  "additionalInfo": {
                    "key":"RUT",
                    "RUT":"1-9"
                  }
                }
              }

              console.log("[Brito] :: [RESULTADO] :: [resultado] :: ");
              console.log(resultado);
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
});

module.exports = router