var info = 
{
  "pais" : "GT",
  "nomApp" : "MenuBot_GT",
  "version" : "6.3.0"
};

var url_estd = 'https://estadisticasmenubot.mybluemix.net/opcion/insert';

var horario_24_7 = true;

var horario_WA = {
  "OPEN_HOUR" : 7,
  "OPEN_MINUTE" : 0,
  "CLOSE_HOUR" : 22,
  "CLOSE_MINUTE" : 50,
  dias : {
    "0" : ["domingo",true],
    "1" : ["lunes",true],
    "2" : ["martes",true],
    "3" : ["miercoles",true],
    "4" : ["jeves",true],
    "5" : ["viernes",true],
    "6" : ["sabado",true]
  }
};

var horario_FB = {
  "OPEN_HOUR" : 8,
  "OPEN_MINUTE" : 0,
  "CLOSE_HOUR" : 23,
  "CLOSE_MINUTE" : 59,
  //"CLOSE_HOUR" : 20,
  //"CLOSE_MINUTE" : 0,
  dias : {
    "0" : ["domingo",true],
    "1" : ["lunes",true],
    "2" : ["martes",true],
    "3" : ["miercoles",true],
    "4" : ["jeves",true],
    "5" : ["viernes",true],
    "6" : ["sabado",true]
  }
};

var horario_TW = {
  "OPEN_HOUR" : 8,
  "OPEN_MINUTE" : 0,
  "CLOSE_HOUR" : 23,
  "CLOSE_MINUTE" : 59,
  //"CLOSE_HOUR" : 20,
  //"CLOSE_MINUTE" : 0,
  dias : {
    "0" : ["domingo",true],
    "1" : ["lunes",true],
    "2" : ["martes",true],
    "3" : ["miercoles",true],
    "4" : ["jeves",true],
    "5" : ["viernes",true],
    "6" : ["sabado",true]
  }
};

exports.horario_WA = horario_WA;
exports.horario_FB = horario_FB;
exports.horario_TW = horario_TW;
exports.info = info;
exports.url_estd = url_estd;
exports.horario_24_7 = horario_24_7;
