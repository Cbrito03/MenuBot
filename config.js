//var cola_opc1 = "WhatsappTest";
var pais = "GT", nomApp = "MenuBot_GT";

var cola_opc1 = "GT_Wa_Ventas";

var cola_opc_1_1 = "GT_WA_Ventas_MO";
var cola_opc_1_1_FB = "GT_FB_MSS_VENTAS";
var cola_opc_1_1_TW = "GT_TW_DM_VENTAS";

var cola_opc_1_2 = "GT_WA_Ventas_FI";
var cola_opc_1_2_FB = "GT_FB_MSS_SAC";
var cola_opc_1_2_TW = "GT_TW_DM_SAC";

var cola_opc2 = "GT_Wa_Movil";
var cola_opc2_FB = "GT_FB_MSS_SAC";
var cola_opc2_TW = "GT_TW_DM_SAC";

var OPEN_HOUR = 8;
var OPEN_MINUTE = 0;

var CLOSE_HOUR = 20;
var CLOSE_MINUTE = 0;

var offset = -6;

var dias = {
    "0" : ["domingo",true],
    "1" : ["lunes",true],
    "2" : ["martes",true],
    "3" : ["miercoles",true],
    "4" : ["jeves",true],
    "5" : ["viernes",true],
    "6" : ["sabado",true]
};

var mjs_horario = "¡Hola! Te saluda AVI 🤖 tu Asistente Virtual de Claro quiero comentarte que nuestros horarios ";
    mjs_horario += "de atención son de lunes a domingo de 08:00 am a 08:00 pm. $cr $cr";
    mjs_horario += 'Con gusto te estaremos atendiendo mañana para ayudarte con tu solicitud, si quieres que uno de ';
    mjs_horario += 'nuestros asesores se comunique contigo por llamada coloca *“Llamarme”* o si prefieres que te sigamos atendiendo ';
    mjs_horario += 'por este medio coloca *“Whatsapp”*';

var msj_asesor_uno = "👋 Te damos la bienvenida a la GigaRed Claro, nuestro compromiso es mantenerte conectado.😊 $cr $cr ";
    msj_asesor_uno += "Ingresa el número de la opción con la que necesitas apoyo: $cr $cr ";
    msj_asesor_uno += "1. Adquirir un plan nuevo, información de promociones o renovar mi servicio $cr ";
    msj_asesor_uno += "2. Gestiones y soporte de mis servicios actuales $cr ";

var msj_opcion_uno = "*¡Hola!🤗 Bienvenido a nuestro servicio de ventas Claro.* Recuerda que esta opción es exclusiva para ventas y/o renovaciones. $cr $cr ";
    msj_opcion_uno += "Por favor ingresa el número de la opción con la que necesitas apoyo: $cr $cr ";
    msj_opcion_uno += "1. Servicios Móviles $cr ";
    msj_opcion_uno += "2. Servicios Fijos $cr ";

var msj_facturar = "Puedes descargar tu factura móvil ingresando al siguiente portal: http://bit.ly/MiClaroFactura $cr $cr";
    msj_facturar += "Puedes pagar fácil y rápido aquí: gt.mipagoclaro.com 💳🧾 $cr $cr";
    msj_facturar += "Si tienes consultas sobre algún detalle específico en tu factura, envía *asesor* 👩💻👨💻";

var msj_espera = "En este momento nuestros agentes están ocupados, te atenderemos a la brevedad posible 😥. Para adelantar con tu solicitud, detalla tu consulta y número telefónico. (Si ya lo brindaste haz caso omiso)";

var msj_ayuda = {  
  msj_ayuda_1 : "Descarga nuestra App renovada para ti 👉🏼 http://onelink.to/claroappgt $cr $cr ¿Cómo me registro? Android",
  msj_ayuda_2 : "¿Cómo me registro? Apple",
  msj_ayuda_3 : "¿Cómo asocio mis números?",  
  img_ayuda_1 : "https://nodejsmenubotca.mybluemix.net//red_portatiles_1.png",
  img_ayuda_2 : "https://nodejsmenubotca.mybluemix.net//red_portatiles_2.png",
  img_ayuda_3 : "https://nodejsmenubotca.mybluemix.net//red_portatiles_3.png"
}

msj_ayuda_FB = [
  {
    "type": "text",
    "text": msj_ayuda.msj_ayuda_1,
    "mediaURL" : ""
  },
  {
    "type": 'image',
    "text": '',
    "mediaURL": msj_ayuda.img_ayuda_1
  },
  {
    "type": "text",
    "text": msj_ayuda.msj_ayuda_2,
    "mediaURL" : ""
  },
  {
    "type": 'image',
    "text": '',
    "mediaURL": msj_ayuda.img_ayuda_2
  },
  {
    "type": "text",
    "text": msj_ayuda.msj_ayuda_3,
    "mediaURL" : ""
  },
  {
    "type": 'image',
    "text": '',
    "mediaURL": msj_ayuda.img_ayuda_3
  }
];

msj_ayuda_WATW = [
  {
    "type": "image",
    "text": msj_ayuda.msj_ayuda_1,
    "mediaURL" : msj_ayuda.img_ayuda_1
  },
  {
    "type": 'image',
    "text": msj_ayuda.msj_ayuda_2,
    "mediaURL": msj_ayuda.img_ayuda_2
  },
  {
    "type": 'image',
    "text": msj_ayuda.msj_ayuda_3,
    "mediaURL": msj_ayuda.img_ayuda_3
  }
];

var contenedor = {
  "type": "",
  "accion" : "",
  "queue" : "",
  "mensaje" : "",
  "mediaURL" : ""
};

var palabras = {
  "cotizar": {
      "type": "text",
      "accion" : "continue",
      "queue" : "",
      "mensaje" : msj_opcion_uno,
      "mediaURL" : ""
  },
  "factura": {
      "type": "text",
      "accion" : "continue",
      "queue" : "",
      "mensaje" : msj_facturar,
      "mediaURL" : ""
  },
  "ayuda": {
    "type": "text",
    "accion" : "continue",
    "queue" : "",
    "mensaje" : "",
    "mediaURL" : ""
  },
  "soporte": {
      "type": "text", //"image",
      "accion" : "continue",
      "queue" : "",
      "mensaje" : "Da click acá y te apoyaremos de inmediato con soporte técnico para cualquiera de tus servicios fijos https://bit.ly/soporte-técnico-Claro",
      "mediaURL" : "" //"https://nodejsmenubotca.mybluemix.net/Router.jpeg"
  },
  "asistencia": {
    "type": "text",
    "accion" : "continue",
    "queue" : "",
    "mensaje" : "Sigue los pasos detallados en la imagen,  https://bit.ly/configuracion_movil $cr $cr Si el inconveniente persiste, envía *asesor* 👩💻👨💻 ",
    "mediaURL" : ""
  },
  "precio": {
      "type": "text",
      "accion" : "continue",
      "queue" : "",
      "mensaje" : "Conoce nuestros equipos disponibles 📥📁📱 ingresando aquí $cr https://tiendaenlinea.claro.com.gt/",
      "mediaURL" : ""
  },
  "recarga": {
      "type": "text",
      "accion" : "continue",
      "queue" : "",
      "mensaje" : "Recarga fácil y rápido visitando nuestro portal: https://paquetes.miclaro.com.gt/ 😎",
      "mediaURL" : ""
  },
  "Paquete": {
      "type": "text",
      "accion" : "continue",
      "queue" : "",
      "mensaje" : "Compra el paquete que prefieras ingresando a https://paquetes.miclaro.com.gt",
      "mediaURL" : ""
  },
  "pagar": {
      "type": "text",
      "accion" : "continue",
      "queue" : "",
      "mensaje" : "Para conocer el saldo, fecha de vencimiento y también poder pagar tu factura móvil y residencial, puedes ingresar al siguiente portal: gt.mipagoclaro.com 💳🧾",
      "mediaURL" : ""
  },  
  "configuracion": {
      "type": "image",
      "accion" : "continue",
      "queue" : "",
      "mensaje" : "Sigue los pasos detallados en la imagen, https://bit.ly/configuracion_movil $cr $cr Si el inconveniente persiste, envía *asesor* 👩💻👨💻",
      "mediaURL" : "https://nodejsmenubotca.mybluemix.net/APN%20GT.jpeg"
  },  
  "club": {
      "type": "text",
      "accion" : "continue", 
      "queue" : "",
      "mensaje" : "Si eres Claro 😉 eres parte del club con beneficios y descuentos. $cr ¡Descarga la App! 👇 $cr Android: http://bit.ly/ClaroClub-Android $cr iOS: http://bit.ly/ClaroClubiOS",
      "mediaURL" : ""
  },
  "asesor": {
      "type": "text",
      "accion" : "continue",
      "queue" : "",
      "mensaje" : msj_asesor_uno,
      "mediaURL" : ""
  }
}

var menu_opciones = 
{
  "1": {
      "type": "text",
      "accion" : "continue", 
      "queue" : "",
      "mensaje" : msj_opcion_uno,
      "mediaURL" : ""
  },
  "2": {
      "accion" : "transfer",
      "queue" : cola_opc2,
      "mensaje" : msj_espera//""//"En un momento mas uno de nuestros asesores te atenderá"
  }
}

var menu_opciones_2 = 
{
  "1": {
      "accion" : "transfer",
      "queue" : cola_opc_1_1,
      "mensaje" : msj_espera //""
  },
  "2": {
      "accion" : "transfer",
      "queue" : cola_opc_1_2,
      "mensaje" : msj_espera //""//"En un momento mas uno de nuestros asesores te atenderá"
  }
}

var menu_fueraHorario = 
{
  "llamarme": {
    "type": "text",
    "accion" : "transfer", 
    "queue" : cola_opc_1_1,
    "mensaje" : "",
    "mediaURL" : ""
  },
  "whatsapp": {
    "type": "text",
    "accion" : "transfer",
    "queue" : cola_opc_1_2,
    "mensaje" : "",
    "mediaURL" : ""
  }
}

var mensaje_df = "¡Hola! $cr Soy *Avi*, tu asistente virtual 🤖 de Claro $cr ";
    mensaje_df +="¡Échale un vistazo a mi nuevo menú de opciones con las que te puedo apoyar más rápido!  Solo envía una de las palabras que aparecen resaltadas según tu consulta. $cr $cr "
    mensaje_df +="➡️ Envía *cotizar* para conocer nuestros planes móviles y residenciales. 😎 $cr $cr ";
    mensaje_df +="➡️ Envía *factura* para conocer tus opciones en consulta de facturas. (Monto y fecha de vencimiento) 📥 $cr $cr ";
    mensaje_df +="➡️ Envía *ayuda* para conocer todo lo que puedes hacer en un mismo lugar. ¡Puedes consultar tu saldo, tus paquetes contratados, tu consumo de internet móvil y mucho más! 😎 $cr $cr ";
    mensaje_df +="➡️ Envía *soporte* si presentas inconvenientes con tu internet de casa por lentitud o no navegas, línea fija o Claro TV ☎📺🖥 $cr $cr ";
    mensaje_df +="➡️ Envía *asistencia* si presentas inconvenientes con tu internet de celular, llamadas o mensajes de texto📱. $cr $cr ";
    mensaje_df +="➡️ Envía *precio* para ver el catálogo de celulares prepago por marca. 📱 $cr $cr ";
    mensaje_df +="➡️ Envía *recarga* para hacer una recarga. $cr $cr ";
    mensaje_df +="➡️ Envía *paquete* para comprar un paquete. $cr $cr ";
    mensaje_df +="➡️ Envía *pagar* para ver el saldo, fecha de vencimiento y pagar tu factura móvil y residencial. 💳 $cr $cr ";    
    mensaje_df +="➡️ Envía *configuración* para conocer los pasos a seguir si no puedes navegar desde tu celular📱.  $cr $cr ";    
    mensaje_df +="➡️ Envía *club* para conocer los establecimientos con promociones especiales solo por ser cliente Claro. 😎 💰 $cr $cr ";
    //mensaje_df +="➡️ Envía *asesor* si aún deseas ser atendido por uno de nuestros agentes de servicio al cliente o ventas. 👩💻👨💻 $cr $cr ";
  
var msj_default = 
{
  "type": "text",
  "accion": "continue",
  "mensaje" : mensaje_df
}

var messaje_def_opdos = "Pedimos tu comprensión por los tiempos de espera. Puedes utilizar, sin costo alguno, nuestros canales digitales de autogestión: Mi Pago Claro (https://gt.mipagoclaro.com/), Mi Claro Express (https://paquetes.miclaro.com.gt/) Menú Digital (http://bit.ly/ClaroMenuDigital) y consultas de saldos de facturas enviando tu número de teléfono por mensaje de texto a la marcación 147100. ¡Claro que sí!";
var fecha_actual = "";
var hora_actual = "";

obtener_fecha = function()
{
    var now = new Date();
        
    var anio = now.getFullYear();
    var mes = now.getMonth() + 1;
    var dia = now.getDate();

    var hora = now.getHours();
    var minutos = now.getMinutes();
    var segundos = now.getSeconds();

    if(mes < 10){ mes = '0' + mes }
    if(dia < 10){ dia = '0' + dia }
    if(hora < 10){ hora = '0' + hora }
    if(minutos < 10){ minutos = '0' + minutos }
    if(segundos < 10){ segundos = '0' + segundos }

    fecha_actual = dia + "-" + mes + "-" + anio;

    hora_actual = hora + ":" + minutos + ":" + segundos;
    exports.fecha_actual = fecha_actual;
    exports.hora_actual = hora_actual;
}

exports.palabras = palabras;

exports.menu_opciones = menu_opciones;

exports.menu_opciones_2 = menu_opciones_2;

exports.menu_fueraHorario = menu_fueraHorario;

exports.msj_default = msj_default;

exports.obtener_fecha = obtener_fecha;

exports.messaje_def_opdos = messaje_def_opdos;

exports.OPEN_HOUR = OPEN_HOUR;
exports.OPEN_MINUTE = OPEN_MINUTE;

exports.CLOSE_HOUR = CLOSE_HOUR;
exports.CLOSE_MINUTE = CLOSE_MINUTE;
exports.offset = offset;

exports.dias = dias;

exports.mjs_horario = mjs_horario;

exports.contenedor = contenedor;

exports.pais = pais;

exports.nomApp = nomApp;

/// Export de colas
/// 
/// 
exports.cola_opc1 = cola_opc1;

exports.cola_opc_1_1 = cola_opc_1_1;
exports.cola_opc_1_1_FB = cola_opc_1_1_FB;
exports.cola_opc_1_1_TW = cola_opc_1_1_TW;

exports.cola_opc_1_2 = cola_opc_1_2;
exports.cola_opc_1_2_FB = cola_opc_1_2_FB;
exports.cola_opc_1_2_TW = cola_opc_1_2_TW;

exports.cola_opc2 = cola_opc2;
exports.cola_opc2_FB = cola_opc2_FB;
exports.cola_opc2_TW = cola_opc2_TW;

exports.msj_ayuda = msj_ayuda;
exports.msj_ayuda_FB = msj_ayuda_FB;
exports.msj_ayuda_WATW = msj_ayuda_WATW;