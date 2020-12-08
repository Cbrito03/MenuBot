const horario = require('../controllers/validar_horario.js');
const moment_timezone = require('moment-timezone');
const msj_wa = require('../controllers/msj_WA.js');
const config = require('../controllers/config.js');
const localStorage = require('localStorage');
const express = require('express');
const moment = require('moment');
const axios = require('axios');
const async = require('async');

const router = express.Router();

router.post('/wa/message', async (req, res) => {
  console.log("[Brito] :: [Peticion POST WA_GT /message]");
  
  var horarios = horario.validarHorario_WA();

  var resultado, result_messages, result_action;
  var bandera = false , estatus = 200;
  var opcion = "", msj_buscar = "", msj_buscar_opcion = "";

  var bandera_tranferido = false, bandera_fueraHorario = false, bandera_opt = true;

  var apiVersion = req.body.apiVersion;
  var conversationID = req.body.conversationId;
  var authToken = req.body.authToken;
  var channel = req.body.channel;
  var user = req.body.user;
  var context = req.body.context;
  var cadena = req.body.message;

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
               
                result_messages = msj_wa.msj_default.messages;
                result_action = msj_wa.msj_default.action;
                
                 
                                
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
                console.log("Entro a CLIENT_TIMEOUT WA");

                var timeout_acd = "";

                for (var key in msj_wa.colas)
                {
                  if(msj_wa.colas[key].acd == context.lastInteractionQueue)
                  {
                    console.log(msj_wa.colas[key].acd);
                    console.log(msj_wa.colas[key].timeout);
                    timeout_acd = msj_wa.colas[key].timeout;
                    break;
                  }  
                }

                resultado = {
                  "context": context,
                  "action": {
                    "type" : "transfer",
                      "queue" : context.lastInteractionQueue,
                      "timeoutInactivity" : timeout_acd
                  },
                  "messages": [],
                  "additionalInfo": {
                    "key":"RUT",
                    "RUT":"1-9"
                  }
                }
              }

              console.log("[Brito] :: [RESULTADO] :: [resultado GT WA] :: ", resultado);
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