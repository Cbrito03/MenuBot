var cola_opc1 = "WhatsappTest";

var cola_opc2 = "WhatsappSM";

// se agrego imagened
// Alexis 16-04-2020
//favi 16-04-2020
var msj_asesor_uno = 'Pedimos tu comprensión por los tiempos de espera. Puedes utilizar, sin';
    msj_asesor_uno += 'costo alguno, nuestros canales digitales de autogestión: Mi Pago Claro';
    msj_asesor_uno += '(https://gt.mipagoclaro.com/), Mi Claro Express (https://paquetes.miclaro.com.gt/)';
    msj_asesor_uno += 'Menú Digital (http://bit.ly/ClaroMenuDigital) y consultas de saldos de facturas enviando';
    msj_asesor_uno += 'tu número de teléfono por mensaje de texto a la marcación 147100.';
    msj_asesor_uno += '¡Claro que sí!';

var msj_asesor_dos = "👋 Te damos la bienvenida a la GigaRed Claro, nuestro compromiso es mantenerte conectado.😊 $cr $cr ";
msj_asesor_dos += "Ingresa el número de la opción con la que necesitas apoyo: $cr $cr ";
msj_asesor_dos += "1. Adquirir un plan nuevo, información de promociones o renovar mi servicio $cr ";
msj_asesor_dos += "2. Gestiones y soporte de mis servicios actuales $cr ";

var palabras = {
  "club": {
      "type": "text",
      "accion" : "continue", 
      "queue" : "",
      "mensaje" : "Si eres Claro 😉 eres parte del club con beneficios y descuentos. $cr ¡Descarga la App! 👇 $cr Android: http://bit.ly/ClaroClub-Android $cr iOS: http://bit.ly/ClaroClubiOS",
      "mediaURL" : ""
  },
  "cotizar": {
      "type": "text",
      "accion" : "continue",
      "queue" : "",
      "mensaje" : "Ingresa al siguiente link http://bit.ly/TelemarketingClaro y unos de nuestros asesores se comunicará contigo de inmediato para que puedas cotizar nuestros planes móviles y residenciales de acuerdo a tus necesidades. 🤓",
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
  "factura": {
      "type": "text",
      "accion" : "continue",
      "queue" : "",
      "mensaje" : "Puedes descargar tu factura móvil ingresando al siguiente portal: http://bit.ly/MiClaroFactura",
      "mediaURL" : ""
  },
  "configuracion": {
      "type": "image",
      "accion" : "continue",
      "queue" : "",
      "mensaje" : "Sigue los pasos detallados en la imagen, si el inconveniente persiste, favor escribe *asesor* para recibir asistencia técnica con uno de nuestros agentes.",
      "mediaURL" : "https://nodejsmenubotca.mybluemix.net/APN%20GT.jpeg"
  },
  "soporte": {
      "type": "image",
      "accion" : "continue",
      "queue" : "",
      "mensaje" : "Sigue los pasos detallados en la imagen, si el inconveniente persiste, favor escribe *asesor* para recibir asistencia técnica con uno de nuestros agentes.",
      "mediaURL" : "https://nodejsmenubotca.mybluemix.net/Router.jpeg"
  },
  "asesor": {
      "type": "text",
      "accion" : "continue",
      "queue" : "",
      "mensaje" : msj_asesor_uno,      
      "mensaje_dos" : msj_asesor_dos,
      "mediaURL" : ""
  }  
}

var menu_opciones = 
{
  "1": {
      "accion" : "transfer",
      "queue" : cola_opc1,
      "mensaje" : "En un momento mas uno de nuestros asesores lo atenderá"
  },
  "2": {
      "accion" : "transfer",
      "queue" : cola_opc2,
      "mensaje" : "En un momento mas uno de nuestros asesores lo atenderá"
  }
}


var palabras_buscar = [
  "club",
  "cotizar",
  "Precio",
  "Recarga",
  "Paquete",
  "Pagar",
  "Factura",
  "Configuracion",
  "Soporte",
  "asesor",
]

var mensaje_df = "¡Hola! $cr Soy tu asistente virtual 🤖 de Claro $cr Te puedo ayudar con las siguientes opciones: $cr "
  mensaje_df +="Envía *cotizar* para conocer nuestros planes móviles y residenciales. 😎 $cr "
  mensaje_df +="Envía *precio* para ver el catálogo de celulares prepago por marca. 📱 $cr ";  
  mensaje_df +="Envía *recarga* para hacer una recarga. $cr ";
  mensaje_df +="Envía *paquete* para comprar un paquete. $cr ";
  mensaje_df +="Envía *pagar* para ver el saldo, fecha de vencimiento y pagar tu factura móvil y residencial. 💳 $cr ";
  mensaje_df +="Envía *factura* para conocer tus opciones en consulta de facturas. (Monto y fecha de vencimiento) 📥 $cr ";
  mensaje_df +="Envía *configuración* para conocer los pasos a seguir si tienes inconvenientes con tu navegación 📱. $cr ";
  mensaje_df +="Envía *soporte* si presentas inconvenientes con tu router de tu internet residencial. ☎📺🖥 $cr ";
  mensaje_df +="Envía *club* para conocer los establecimientos con promociones especiales solo por ser cliente Claro. 😎 💰 $cr ";
  mensaje_df +="Envía *asesor* si aún deseas ser atendido por uno de nuestros agentes de servicio al cliente o ventas. 👩💻👨💻 $cr ";

var msj_default = {
  "accion": "continue",
  "mensaje" : mensaje_df
}
var messaje_def_opdos = "Pedimos tu comprensión por los tiempos de espera. Puedes utilizar, sin costo alguno, nuestros canales digitales de autogestión: Mi Pago Claro (https://gt.mipagoclaro.com/), Mi Claro Express (https://paquetes.miclaro.com.gt/) Menú Digital (http://bit.ly/ClaroMenuDigital) y consultas de saldos de facturas enviando tu número de teléfono por mensaje de texto a la marcación 147100. ¡Claro que sí!";

var msj_asesor = ""


var bandera_log = true;

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

exports.palabras_buscar = palabras_buscar;

exports.menu_opciones = menu_opciones;

exports.msj_default = msj_default;

exports.bandera_log = bandera_log;

exports.obtener_fecha = obtener_fecha;

exports.messaje_def_opdos = messaje_def_opdos;