var colas = {
  "asesor_1_1" : {
      "timeout" : 900000,
      "acd" : "GT_WA_Ventas_MO"
  },
  "asesor_1_2" : {
      "timeout" : 900000,
      "acd" : "GT_WA_Ventas_FI"
  },
  "asesor_2" : {
      "timeout" : 180000,
      "acd" : "GT_Wa_Movil"
  },
  "cotizar_1" : {
      "timeout" : 900000,
      "acd" : "GT_WA_Ventas_MO"
  },
  "cotizar_2" : {
      "timeout" : 900000,
      "acd" : "GT_WA_Ventas_FI"
  },
  "precio_asesor" : {
      "timeout" : 180000, // "timeout" : 900000,
      "acd" : "GT_Wa_Movil" // "acd" : "GT_Wa_Ventas_MO"
  },
  "factura_asesor" : {
      "timeout" : 180000,
      "acd" : "GT_Wa_Movil"
  },
  "asistencia_asesor" : {
      "timeout" : 180000,
      "acd" : "GT_Wa_Movil"
  }  
};

var mensaje_df = "¡Hola! \n Soy *Avi*, tu asistente virtual 🤖 de Claro \n ";
    mensaje_df +="¡Échale un vistazo a mi nuevo menú de opciones con las que te puedo apoyar más rápido!  Solo envía una de las palabras que aparecen resaltadas según tu consulta. \n \n "
    mensaje_df +="➡️ Envía *cotizar* para conocer nuestros planes móviles y residenciales si deseas renovar o contratar nuevos servicios. 😎 \n \n ";
    mensaje_df +="➡️ Envía *factura* para conocer el detalle de tu factura, monto y fecha de vencimiento. 📥 \n \n ";
    mensaje_df +="➡️ Envía *ayuda* para conocer todo lo que puedes hacer en un mismo lugar. ¡Puedes consultar tu saldo, tus paquetes contratados, tu consumo de internet móvil y mucho más! 😎 \n \n ";
    mensaje_df +="➡️ Envía *soporte* si presentas inconvenientes con tu internet de casa por lentitud o no navegas, línea fija o Claro TV ☎📺🖥 \n \n ";
    mensaje_df +="➡️ Envía *asistencia* si presentas inconvenientes con tu internet de celular, llamadas o mensajes de texto📱. \n \n ";
    mensaje_df +="➡️ Envía *pagar* para ver el saldo, fecha de vencimiento y pagar tu factura móvil y residencial. 💳 \n \n ";
    mensaje_df +="➡️ Envía *recarga* para hacer una recarga. \n \n ";
    mensaje_df +="➡️ Envía *paquete* para compra de paquete. \n \n ";
    mensaje_df +="➡️ Envía *precio* para ver el catálogo de celulares prepago por marca 📱 \n \n ";       
    mensaje_df +="➡️ Envía *club* para conocer los establecimientos con promociones especiales solo por ser cliente Claro. 😎 💰 \n \n ";
    //mensaje_df +="➡️ Envía *asesor* si aún deseas ser atendido por uno de nuestros agentes de servicio al cliente o ventas. 👩💻👨💻 \n \n ";

var mjs_horario = "¡Hola! Te saluda AVI 🤖 tu Asistente Virtual de Claro quiero comentarte que nuestros horarios ";
    mjs_horario += "de atención son de lunes a domingo de 08:00 am a 08:00 pm. \n \n";
    mjs_horario += 'Con gusto te estaremos atendiendo mañana para ayudarte con tu solicitud, si quieres que uno de ';
    mjs_horario += 'nuestros asesores se comunique contigo por llamada coloca *“Llamarme”* o si prefieres que te sigamos atendiendo ';
    mjs_horario += 'por este medio coloca *“Whatsapp”*';

var msj_espera = "En este momento nuestros agentes están ocupados, te atenderemos a la brevedad posible 😥. Para adelantar con tu solicitud, detalla tu consulta y número telefónico. (Si ya lo brindaste haz caso omiso)";

var messaje_def_opdos = "Pedimos tu comprensión por los tiempos de espera. Puedes utilizar, sin costo alguno, nuestros canales digitales de autogestión: Mi Pago Claro (https://gt.mipagoclaro.com/), ";
    messaje_def_opdos += "Mi Claro Express (https://paquetes.miclaro.com.gt/) Menú Digital (http://bit.ly/ClaroMenuDigital) y consultas de saldos de facturas enviando tu número de teléfono por mensaje de texto a la marcación 147100. ¡Claro que sí!";

var msj_asesor_uno = "👋 Te damos la bienvenida a la GigaRed Claro, nuestro compromiso es mantenerte conectado.😊 \n \n ";
    msj_asesor_uno += "Ingresa el número de la opción con la que necesitas apoyo: \n \n ";
    msj_asesor_uno += "1. Adquirir un plan nuevo, información de promociones o renovar mi servicio \n ";
    msj_asesor_uno += "2. Gestiones y soporte de mis servicios actuales \n ";

var msj_cotizar = "*¡Hola!🤗 Bienvenido a nuestro servicio de ventas Claro.* Recuerda que esta opción es exclusiva para conocer el estado de tu compra y/o renovaciones. \n \n ";
    msj_cotizar += "Por favor ingresa el número de la opción con la que necesitas apoyo: \n \n ";
    msj_cotizar += "1. Servicios Móviles \n ";
    msj_cotizar += "2. Servicios Fijos \n ";

var msj_asesor_op1 = "*¡Hola!🤗 Bienvenido a nuestro servicio de ventas Claro.* Recuerda que esta opción es exclusiva para conocer el estado de tu compra y/o renovaciones. \n \n ";
    msj_asesor_op1 += "Por favor ingresa el número de la opción con la que necesitas apoyo: \n \n ";
    msj_asesor_op1 += "1. Servicios Móviles \n ";
    msj_asesor_op1 += "2. Servicios Fijos \n ";

var msj_factura = "Puedes descargar tu factura móvil ingresando al siguiente portal: http://bit.ly/MiClaroFactura \n \n";
    msj_factura += "Puedes pagar fácil y rápido aquí: gt.mipagoclaro.com 💳🧾 \n \n";
    msj_factura += "Si tienes consultas sobre algún detalle específico en tu factura, envía *asesor* 👩💻👨💻";

var msj_ayuda = "¡Consulta tu consumo de datos, tu saldo, tus paquetes contratados y mucho más! desde nuestra App renovada para ti. \n ";
    msj_ayuda += "Descarga la App 👉🏼 http://onelink.to/claroappgt \n ";
    msj_ayuda += "¿Cómo me registro? \n ";
    msj_ayuda += "👉🏼 https://bit.ly/registro-android \n ";
    msj_ayuda += "👉🏼 https://bit.ly/registro-apple \n ";
    msj_ayuda += "¿Cómo asocio mis números? \n ";
    msj_ayuda += "👉🏼 https://bit.ly/asociar-números \n ";

var msj_precio = "Conoce nuestros equipos disponibles 📥📁📱 ingresando aquí \n ";
    msj_precio += "https://tiendaenlinea.claro.com.gt/ \n";
    msj_precio += "O envía *asesor* 👩💻👨💻 si deseas consultar el seguimiento de tu compra ya realizada o consultar el estado de tu compra.";

var msj_club = "Si eres Claro 😉 eres parte del club con beneficios y descuentos.\n "; 
    msj_club += "¡Descarga la App! 👇 \n";
    msj_club += "Android: http://bit.ly/ClaroClub-Android \n";
    msj_club += "iOS: http://bit.ly/ClaroClubiOS ";

var msj_asesor = "👋 Te damos la bienvenida a la GigaRed Claro, nuestro compromiso es mantenerte conectado.😊 \n \n ";
    msj_asesor += "Ingresa el número de la opción con la que necesitas apoyo: \n \n ";
    msj_asesor += "1. Adquirir un plan nuevo, información de promociones o renovar mi servicio \n ";
    msj_asesor += "2. Gestiones y soporte de mis servicios actuales \n ";

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
  "factura": {
    "action" : {
      "type" : "continue",
      "queue" : ""
    },
    "messages" : [
      {
        "type" : "text",
        "text" :  msj_factura,
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
        "text" :  "Da click acá y te apoyaremos de inmediato con soporte técnico para cualquiera de tus servicios fijos https://bit.ly/Soporte-Residencial",
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
        "text" :  "Sigue los pasos detallados en la imagen,  https://bit.ly/configuracion_movil \n \n Si el inconveniente persiste, envía *asesor* 👩💻👨💻",
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
  "paquete": {
    "action" : {
      "type" : "continue",
      "queue" : ""
    },
    "messages" : [
      {
        "type" : "text",
        "text" :  "Compra el paquete que prefieras ingresando a https://paquetes.miclaro.com.gt",
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

var msj_factura_asesor = {
  "action" : {
    "type" : "transfer",
    "queue" : colas["factura_asesor"].acd,
    "timeoutInactivity" : colas["factura_asesor"].timeout
  },
  "messages" : []
};

var msj_asistencia_asesor = {
  "action" : {
    "type" : "transfer",
    "queue" : colas["asistencia_asesor"].acd,
    "timeoutInactivity" : colas["asistencia_asesor"].timeout
  },
  "messages" : []
};

var msj_precio_asesor = {
  "action" : {
    "type" : "transfer",
    "queue" : colas["precio_asesor"].acd,
    "timeoutInactivity" : colas["precio_asesor"].timeout
  },
  "messages" : []
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
}

var menu_opciones_asesor = 
{
  "1" : {
    "action" : {
      "type" : "continue",
      "queue" : ""
    },
    "messages" : [
      {
        "type" : "text",
        "text" :  msj_asesor_op1,
        "mediaURL" : ""
      }
    ]
  },
  "2" : {
    "action" : {
      "type" : "transfer",
      "queue" : colas["asesor_2"].acd,
      "timeoutInactivity" : colas["asesor_2"].timeout
    },
    "messages" : []
  }
}

var menu_opciones_asesor_op1 = 
{
  "1": {
    "action" : {
      "type" : "transfer",
      "queue" : colas["asesor_1_1"].acd,
      "timeoutInactivity" : colas["asesor_1_1"].timeout
    },
    "messages" : []
  },
  "2": {
    "action" : {
      "type" : "transfer",
      "queue" : colas["asesor_1_2"].acd,
      "timeoutInactivity" : colas["asesor_1_2"].timeout
    },
    "messages" : []
  }
}

var menu_opciones_cotizar = 
{
  "1": {
    "action" : {
      "type" : "transfer",
      "queue" : colas["cotizar_1"].acd,
      "timeoutInactivity" : colas["cotizar_1"].timeout
    },
    "messages" : []
  },
  "2": {
    "action" : {
      "type" : "transfer",
      "queue" : colas["cotizar_2"].acd,
      "timeoutInactivity" : colas["cotizar_2"].timeout
    },
    "messages" : []
  }
}

var menu_fueraHorario = 
{
  "llamarme": {
    "action" : {
      "type" : "transfer",
      "queue" : colas["asesor_1_1"].acd,
      "timeoutInactivity" : colas["asesor_1_1"].timeout
    },
    "messages" : []
  },
  "whatsapp": {
    "action" : {
      "type" : "transfer",
      "queue" : colas["asesor_1_2"].acd,
      "timeoutInactivity" : colas["asesor_1_2"].timeout
    },
    "messages" : []
  }
}

exports.msj_default = msj_default;

exports.palabras = palabras;

exports.contenedor = contenedor;

exports.msj_factura_asesor = msj_factura_asesor;

exports.msj_asistencia_asesor = msj_asistencia_asesor;

exports.msj_precio_asesor = msj_precio_asesor;

exports.msj_fuera_horario = msj_fuera_horario;

exports.menu_opciones_asesor = menu_opciones_asesor;

exports.menu_opciones_asesor_op1 = menu_opciones_asesor_op1;

exports.menu_opciones_cotizar = menu_opciones_cotizar;

exports.menu_fueraHorario = menu_fueraHorario;

exports.colas = colas;