var colas = {
  "asesor" :
  {
    "1_1" : "GT_TW_DM_VENTAS",
    "1_2" : "GT_TW_DM_SAC",
    "2" : "GT_TW_DM_SAC",
    "precio" : "GT_TW_DM_Ventas_MO",
    "factura" : "GT_TW_DM_SAC",
    "asistencia" : "GT_TW_DM_SAC"
  },
  "datos" :
  {
    "1_1" : "GT_TW_DM_VENTAS",
    "1_2" : "GT_TW_DM_SAC",
    "2" : "GT_TW_DM_SAC",
  },
  "cotizar" :
  {
    "1" : "GT_TW_DM_Ventas_MO",
    "2" : "GT_TW_DM_Ventas_FI"
  },
  "estado" :
  {
    "1" : "GT_TW_DM_Ventas_MO",
    "2" : "GT_TW_DM_Ventas_FI"
  }
};

var mensaje_df = "¡Hola! $cr Soy *Avi*, tu asistente virtual 🤖 de Claro $cr ";
    mensaje_df +="¡Échale un vistazo a mi nuevo menú de opciones con las que te puedo apoyar más rápido!  Solo envía una de las palabras que aparecen resaltadas según tu consulta. $cr $cr "
    mensaje_df +="➡️ Envía *cotizar* para conocer nuestros planes móviles y residenciales si deseas renovar o contratar nuevos servicios. 😎 $cr $cr ";
    mensaje_df +="➡️ Envía *estado* para conocer cómo va tu compra de un servicio nuevo o renovación realizada a través de nuestros asesores de ventas 😎 $cr $cr ";
    mensaje_df +="➡️ Envía *datos* si te hemos solicitado en nuestro muro que envíes tus datos personales como número de teléfono, caso o nombre para dar seguimiento a tu solicitud. 😎 $cr $cr ";
    mensaje_df +="➡️ Envía *factura* para conocer tus opciones en consulta de facturas. (Monto y fecha de vencimiento) 📥 $cr $cr ";
    mensaje_df +="➡️ Envía *ayuda* para conocer todo lo que puedes hacer en un mismo lugar. ¡Puedes consultar tu saldo, tus paquetes contratados, tu consumo de internet móvil y mucho más! 😎 $cr $cr ";
    mensaje_df +="➡️ Envía *soporte* si presentas inconvenientes con tu internet de casa por lentitud o no navegas, línea fija o Claro TV ☎📺🖥 $cr $cr ";
    mensaje_df +="➡️ Envía *asistencia* si presentas inconvenientes con tu internet de celular, llamadas o mensajes de texto📱. $cr $cr ";
    mensaje_df +="➡️ Envía *pagar* para ver el saldo, fecha de vencimiento y pagar tu factura móvil y residencial. 💳 $cr $cr ";
    mensaje_df +="➡️ Envía *recarga* para hacer una recarga o comprar un paquete. $cr $cr ";
    mensaje_df +="➡️ Envía *precio* para ver el catálogo de celulares prepago por marca o consultar el estado de tu compra. 📱 $cr $cr ";       
    mensaje_df +="➡️ Envía *club* para conocer los establecimientos con promociones especiales solo por ser cliente Claro. 😎 💰 $cr $cr ";
    //mensaje_df +="➡️ Envía *asesor* si aún deseas ser atendido por uno de nuestros agentes de servicio al cliente o ventas. 👩💻👨💻 $cr $cr ";

var mjs_horario = "¡Hola! Te saluda AVI 🤖 tu Asistente Virtual de Claro quiero comentarte que nuestros horarios ";
    mjs_horario += "de atención son de lunes a domingo de 08:00 am a 08:00 pm. $cr $cr";
    mjs_horario += 'Con gusto te estaremos atendiendo mañana para ayudarte con tu solicitud, si quieres que uno de ';
    mjs_horario += 'nuestros asesores se comunique contigo por llamada coloca *“Llamarme”* o si prefieres que te sigamos atendiendo ';
    mjs_horario += 'por este medio coloca *“Whatsapp”*';

var msj_espera = "En este momento nuestros agentes están ocupados, te atenderemos a la brevedad posible 😥. Para adelantar con tu solicitud, detalla tu consulta y número telefónico. (Si ya lo brindaste haz caso omiso)";

var messaje_def_opdos = "Pedimos tu comprensión por los tiempos de espera. Puedes utilizar, sin costo alguno, nuestros canales digitales de autogestión: Mi Pago Claro (https://gt.mipagoclaro.com/), ";
    messaje_def_opdos += "Mi Claro Express (https://paquetes.miclaro.com.gt/) Menú Digital (http://bit.ly/ClaroMenuDigital) y consultas de saldos de facturas enviando tu número de teléfono por mensaje de texto a la marcación 147100. ¡Claro que sí!";

var msj_datos = "👋 Te damos la bienvenida a la GigaRed Claro, nuestro compromiso es mantenerte conectado.😊 $cr $cr ";
    msj_datos += "Ingresa el número de la opción con la que necesitas apoyo: $cr $cr ";
    msj_datos += "1. Adquirir un plan nuevo, información de promociones o renovar mi servicio $cr ";
    msj_datos += "2. Gestiones y soporte de mis servicios actuales $cr ";

var msj_cotizar = "*¡Hola!🤗 Bienvenido a nuestro servicio de ventas Claro.* Recuerda que esta opción es exclusiva para conocer el estado de tu compra y/o renovaciones. $cr $cr ";
    msj_cotizar += "Por favor ingresa el número de la opción con la que necesitas apoyo: $cr $cr ";
    msj_cotizar += "1. Servicios Móviles $cr ";
    msj_cotizar += "2. Servicios Fijos $cr ";

var msj_estado = "*¡Hola!🤗 Bienvenido a nuestro servicio de ventas Claro.* Recuerda que esta opción es exclusiva para conocer el estado de tu compra y/o renovaciones. $cr $cr ";
    msj_estado += "Por favor ingresa el número de la opción con la que necesitas apoyo: $cr $cr ";
    msj_estado += "1. Servicios Móviles $cr ";
    msj_estado += "2. Servicios Fijos $cr ";

var msj_facturar = "Puedes descargar tu factura móvil ingresando al siguiente portal: http://bit.ly/MiClaroFactura $cr $cr";
    msj_facturar += "Puedes pagar fácil y rápido aquí: gt.mipagoclaro.com 💳🧾 $cr $cr";
    msj_facturar += "Si tienes consultas sobre algún detalle específico en tu factura, envía *asesor* 👩💻👨💻";

var msj_ayuda = "¡Consulta tu consumo de datos, tu saldo, tus paquetes contratados y mucho más! desde nuestra App renovada para ti.  $cr ";
    msj_ayuda += "Descarga la App 👉🏼 http://onelink.to/claroappgt  $cr ";
    msj_ayuda += "¿Cómo me registro?  $cr ";
    msj_ayuda += "👉🏼 https://bit.ly/registro-android $cr ";
    msj_ayuda += "👉🏼 https://bit.ly/registro-apple $cr ";
    msj_ayuda += "¿Cómo asocio mis números? $cr ";
    msj_ayuda += "👉🏼 https://bit.ly/asociar-números $cr ";

var msj_precio = "Conoce nuestros equipos disponibles 📥📁📱 ingresando aquí $cr ";
    msj_precio += "https://tiendaenlinea.claro.com.gt/ $cr";
    msj_precio += "O envía asesor 👩💻👨💻 si deseas consulta el seguimiento de tu compra ya realizada. ";

var msj_club = "Si eres Claro 😉 eres parte del club con beneficios y descuentos.$cr "; 
    msj_club += "¡Descarga la App! 👇 $cr";
    msj_club += "Android: http://bit.ly/ClaroClub-Android $cr";
    msj_club += "iOS: http://bit.ly/ClaroClubiOS ";

var msj_asesor = "👋 Te damos la bienvenida a la GigaRed Claro, nuestro compromiso es mantenerte conectado.😊 $cr $cr ";
    msj_asesor += "Ingresa el número de la opción con la que necesitas apoyo: $cr $cr ";
    msj_asesor += "1. Adquirir un plan nuevo, información de promociones o renovar mi servicio $cr ";
    msj_asesor += "2. Gestiones y soporte de mis servicios actuales $cr ";

var msj_op1_asesor = "*¡Hola!🤗 Bienvenido a nuestro servicio de ventas Claro.* Recuerda que esta opción es exclusiva para conocer el estado de tu compra y/o renovaciones. $cr $cr ";
    msj_op1_asesor += "Por favor ingresa el número de la opción con la que necesitas apoyo: $cr $cr ";
    msj_op1_asesor += "1. Servicios Móviles $cr ";
    msj_op1_asesor += "2. Servicios Fijos $cr ";

var msj_op1_datos = "*¡Hola!🤗 Bienvenido a nuestro servicio de ventas Claro.* Recuerda que esta opción es exclusiva para conocer el estado de tu compra y/o renovaciones. $cr $cr ";
    msj_op1_datos += "Por favor ingresa el número de la opción con la que necesitas apoyo: $cr $cr ";
    msj_op1_datos += "1. Servicios Móviles $cr ";
    msj_op1_datos += "2. Servicios Fijos $cr ";

var palabras = {
  "cotizar": {
    "action" : {
      "type" : "continue",
      "queue" : ""
    },
    "messages" : [
      {
        "type" : "text",
        "text" :  msj_cotizar,
        "mediaURL" : ""
      }
    ]
  },
  "estado": {
    "action" : {
      "type" : "continue",
      "queue" : ""
    },
    "messages" : [
      {
        "type" : "text",
        "text" :  msj_cotizar,
        "mediaURL" : ""
      }
    ]
  },
  "datos": {
    "action" : {
      "type" : "continue",
      "queue" : ""
    },
    "messages" : [
      {
        "type" : "text",
        "text" :  msj_datos,
        "mediaURL" : ""
      }
    ]
  },
  "factura": {
    "action" : {
      "type" : "continue",
      "queue" : ""
    },
    "messages" : [
      {
        "type" : "text",
        "text" :  msj_facturar,
        "mediaURL" : ""
      }
    ]
  },
  "ayuda": {
    "action" : {
      "type" : "continue",
      "queue" : ""
    },
    "messages" : [
      {
        "type" : "text",
        "text" :  msj_ayuda,
        "mediaURL" : ""
      }
    ]
  },
  "soporte": {
    "action" : {
      "type" : "continue",
      "queue" : ""
    },
    "messages" : [
      {
        "type" : "text",
        "text" :  "Da click acá y te apoyaremos de inmediato con soporte técnico para cualquiera de tus servicios fijos https://bit.ly/soporte-técnico-Claro",
        "mediaURL" : ""
      }
    ]
  },
  "asistencia": {
    "action" : {
      "type" : "continue",
      "queue" : ""
    },
    "messages" : [
      {
        "type" : "text",
        "text" :  "Sigue los pasos detallados en la imagen,  https://bit.ly/configuracion_movil $cr $cr Si el inconveniente persiste, envía asesor 👩💻👨💻",
        "mediaURL" : ""
      }
    ]
  },
  "pagar": {
    "action" : {
      "type" : "continue",
      "queue" : ""
    },
    "messages" : [
      {
        "type" : "text",
        "text" :  "Para conocer el saldo, fecha de vencimiento y también poder pagar tu factura móvil y residencial, puedes ingresar al siguiente portal: gt.mipagoclaro.com 💳🧾",
        "mediaURL" : ""
      }
    ]
  },
  "recarga": {
    "action" : {
      "type" : "continue",
      "queue" : ""
    },
    "messages" : [
      {
        "type" : "text",
        "text" :  "Recarga fácil y rápido visitando nuestro portal: https://paquetes.miclaro.com.gt/ 😎",
        "mediaURL" : ""
      }
    ]
  },
  "precio": {
    "action" : {
      "type" : "continue",
      "queue" : ""
    },
    "messages" : [
      {
        "type" : "text",
        "text" :  msj_precio,
        "mediaURL" : ""
      }
    ]
  },
  "asesor": {
    "action" : {
      "type" : "continue",
      "queue" : ""
    },
    "messages" : [
      {
        "type" : "text",
        "text" :  msj_asesor,
        "mediaURL" : ""
      }
    ]
  },
  "club": {
    "action" : {
      "type" : "continue",
      "queue" : ""
    },
    "messages" : [
      {
        "type" : "text",
        "text" :  msj_club,
        "mediaURL" : ""
      }
    ]
  }
};

var contenedor = {
  "action" : {
    "type" : "",
    "queue" : ""
  },
  "messages" : [
    {
      "type" : "",
      "text" :  "",
      "mediaURL" : ""
    }
  ]
};

/******************* MENSAJES ******************/
var msj_default = 
{
  "action" : {
    "type" : "continue",
    "queue" : ""
  },
  "messages" : [
    {
      "type" : "text",
      "text" :  mensaje_df,
      "mediaURL" : ""
    }
  ]
};

var msj_factura_asesor = {
  "action" : {
    "type" : "transfer",
    "queue" : colas.asesor["factura"] // GT_FB_MSS_SAC
  },
  "messages" : [
    /*{
      "type" : "text",
      "text" :  msj_espera,
      "mediaURL" : ""
    }*/
  ]
};

var msj_asistencia_asesor = {
  "action" : {
    "type" : "transfer",
    "queue" : colas.asesor["asistencia"] // GT_FB_MSS_SAC
  },
  "messages" : [
    /*{
      "type" : "text",
      "text" :  msj_espera,
      "mediaURL" : ""
    }*/
  ]
};

var msj_precio_asesor = {
  "action" : {
    "type" : "transfer",
    "queue" : colas.asesor["precio"] // GT_FB_MSS_Ventas_MO
  },
  "messages" : [
    /*{
      "type" : "text",
      "text" :  msj_espera,
      "mediaURL" : ""
    }*/
  ]
};

var msj_fuera_horario =
{
  "action" : {
    "type" : "continue",
    "queue" : ""
  },
  "messages" : [
    {
      "type" : "text",
      "text" :  mjs_horario,
      "mediaURL" : ""
    }
  ]
};

/******************* MENUS ******************/

var menu_opciones_asesor = // pendiente las colas
{
  "1": {
    "action" : {
      "type" : "continue",
      "queue" : ""
    },
    "messages" : [
      {
        "type" : "text",
        "text" :  msj_op1_asesor,
        "mediaURL" : ""
      }
    ]
  },
  "2": {
    "action" : {
      "type" : "transfer",
      "queue" : colas.asesor["2"] // GT_TW_DM_Ventas_FI
    },
    "messages" : [
      /*{
        "type" : "text",
        "text" :  msj_espera,
        "mediaURL" : ""
      }*/
    ]
  }
};

var menu_opciones_datos = // pendiente las colas
{
  "1": {
    "action" : {
      "type" : "continue",
      "queue" : ""
    },
    "messages" : [
      {
        "type" : "text",
        "text" :  msj_op1_datos,
        "mediaURL" : ""
      }
    ]
  },
  "2": {
    "action" : {
      "type" : "transfer",
      "queue" : colas.datos["2"] // GT_TW_DM_Ventas_FI
    },
    "messages" : [
      /*{
        "type" : "text",
        "text" :  msj_espera,
        "mediaURL" : ""
      }*/
    ]
  }
}

var menu_opciones_cotizar = 
{
  "1": {
    "action" : {
      "type" : "transfer",
      "queue" : colas.cotizar["1"] // GT_FB_MSS_Ventas_MO
    },
    "messages" : [
      /*{
        "type" : "text",
        "text" :  msj_espera,
        "mediaURL" : ""
      }*/
    ]
  },
  "2": {
    "action" : {
      "type" : "transfer",
      "queue" : colas.cotizar["2"] // GT_TW_DM_Ventas_FI
    },
    "messages" : [
      /*{
        "type" : "text",
        "text" :  msj_espera,
        "mediaURL" : ""
      }*/
    ]
  }
}

var menu_opciones_estado = 
{
  "1": {
    "action" : {
      "type" : "transfer",
      "queue" : colas.estado["1"] // GT_FB_MSS_Ventas_MO
    },
    "messages" : [
      /*{
        "type" : "text",
        "text" :  msj_espera,
        "mediaURL" : ""
      }*/
    ]
  },
  "2": {
    "action" : {
      "type" : "transfer",
      "queue" : colas.estado["2"] // GT_TW_DM_Ventas_FI
    },
    "messages" : [
      /*{
        "type" : "text",
        "text" :  msj_espera,
        "mediaURL" : ""
      }*/
    ]
  }
}

var menu_fueraHorario = 
{
  "llamarme": {
    "action" : {
      "type" : "transfer",
      "queue" : colas["op_1_1"]
    },
    "messages" : []
  },
  "whatsapp": {
    "action" : {
      "type" : "transfer",
      "queue" : colas["op_1_2"]
    },
    "messages" : []
  }
}

/******************* SUB_MENUS ******************/

var subMenu_opciones_asesor_op1 = 
{
  "1": {
    "action" : {
      "type" : "transfer",
      "queue" : colas.asesor["1_1"] // GT_FB_MSS_VENTAS
    },
    "messages" : [
      /*{
        "type" : "text",
        "text" :  msj_espera,
        "mediaURL" : ""
      }*/
    ]
  },
  "2": {
    "action" : {
      "type" : "transfer",
      "queue" : colas.asesor["1_2"] // GT_FB_MSS_SAC
    },
    "messages" : [
     /* {
        "type" : "text",
        "text" :  msj_espera,
        "mediaURL" : ""
      }*/
    ]
  }
}

var subMenu_opciones_datos_op1 = 
{
  "1": {
    "action" : {
      "type" : "transfer",
      "queue" : colas.datos["1_1"] // GT_FB_MSS_VENTAS
    },
    "messages" : [
      /*{
        "type" : "text",
        "text" :  msj_espera,
        "mediaURL" : ""
      }*/
    ]
  },
  "2": {
    "action" : {
      "type" : "transfer",
      "queue" : colas.datos["1_2"] // GT_FB_MSS_SAC
    },
    "messages" : [
      /*{
        "type" : "text",
        "text" :  msj_espera,
        "mediaURL" : ""
      }*/
    ]
  }
}

/******************* exports ******************/
exports.msj_default = msj_default;

exports.palabras = palabras;

exports.contenedor = contenedor;

/************************Mensajes**************************/
exports.msj_factura_asesor = msj_factura_asesor;

exports.msj_asistencia_asesor = msj_asistencia_asesor;

exports.msj_precio_asesor = msj_precio_asesor;

exports.msj_fuera_horario = msj_fuera_horario;

/***************************Menus**************************/
exports.menu_opciones_asesor = menu_opciones_asesor;

exports.menu_opciones_datos = menu_opciones_datos;

exports.menu_opciones_cotizar = menu_opciones_cotizar;

exports.menu_opciones_estado = menu_opciones_estado;

exports.menu_fueraHorario = menu_fueraHorario;

/******************* SUB_MENUS ******************/
exports.subMenu_opciones_asesor_op1 = subMenu_opciones_asesor_op1;

exports.subMenu_opciones_datos_op1 = subMenu_opciones_datos_op1;

/******************* Colas ******************/
exports.colas = colas;