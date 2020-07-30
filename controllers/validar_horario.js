var config = require('./config.js');
var moment = require('moment');
var moment_timezone = require('moment-timezone');
var fecha_actual = "";

function isValidHour(hour, minute ,close_hour) // Verifica si la hora es valida, entre numeros positivos y menores a 24
{
	//console.log("[Brito] :: [isValidHour] :: [hour] :: " , hour, minute ,close_hour);
	return (hour > -1 && hour < 24 && minute > -1 && minute < 60) && (hour <= close_hour);
}

function validar_rango_hora(hour, OPEN_HOUR, CLOSE_HOUR)
{
	//console.log("[Brito] :: [Horas] :: [hour >= OPEN_HOUR && hour <= CLOSE_HOUR] :: "+ hour +" :: "+ OPEN_HOUR +" :: "+ hour +" :: "+ CLOSE_HOUR);
	return hour >= OPEN_HOUR && hour <= CLOSE_HOUR;
}

function validar_rango_minuto(minute, OPEN_MINUTE, CLOSE_MINUTE)
{
	//console.log("[Brito] :: [Minutos] :: [minute >= OPEN_MINUTE && minute < CLOSE_MINUTE] :: "+ minute +" :: "+ OPEN_MINUTE +" :: "+ minute +" :: "+ CLOSE_MINUTE);
	return minute >= OPEN_MINUTE && minute < CLOSE_MINUTE;
}

function validar_dia(day)
{
	return config.horario_WA.dias[day][1]
}

validarHorario_WA = function()
{
	var now = moment();
	fecha_actual = now.tz("America/Guatemala").format("YYYY-MM-DD hh:mm:ss");

	//console.log("[Brito] :: [validarHorario] :: [NOW] :: ", now);

	var hora = now.tz("America/Guatemala").format("H");
	var minuto = now.tz("America/Guatemala").format("m");
	var dia = now.tz("America/Guatemala").format("d");

	//console.log("[Brito] :: [validarHorario] :: [NOW] :: "+ now +" :: [Hora] :: "+ hora +" :: [Minuto] :: "+ minuto +" :: [Dia] :: "+ dia);

	if(isValidHour(config.horario_WA.OPEN_HOUR, config.horario_WA.OPEN_MINUTE,config.horario_WA.CLOSE_HOUR) && isValidHour(config.horario_WA.OPEN_HOUR, config.horario_WA.CLOSE_MINUTE, config.horario_WA.CLOSE_HOUR))
	{
		if(validar_dia(dia))
		{          
			if(validar_rango_hora(hora, config.horario_WA.OPEN_HOUR, config.horario_WA.CLOSE_HOUR))
			{
				if(hora == config.horario_WA.CLOSE_HOUR)
				{
					if(validar_rango_minuto(minuto, config.horario_WA.OPEN_MINUTE, config.horario_WA.CLOSE_MINUTE))
					{
						return true;
					}
					else
					{
						console.log('[Brito] :: [validarHorario] :: [Minuto False]');
						return false;
					}
				}
				else
				{
					console.log('[Brito] :: [validarHorario] :: [Hora true es diferente a la hora fin] :: [Hora del Sistema] :: '+ hora +" :: [CLOSE_HOUR] :: "+ config.horario_WA.CLOSE_HOUR);
					return true;
				}
			}
			else
			{
				console.log('[Brito] :: [validarHorario] :: [Hora False]');
				return false;
			}
		}
		else
		{
			return false;
		}
	}
	else
	{
		console.log('[Brito] :: [No cumple con los requisitos: Se ingresaron numeros negativos o fuera del rango establecido.]');
		return false;
	}
}

validarHorario_FB = function()
{
	var now = moment();
	fecha_actual = now.tz("America/Guatemala").format("YYYY-MM-DD hh:mm:ss");

	//console.log("[Brito] :: [validarHorario] :: [NOW] :: ", now);
	var hora = now.tz("America/Guatemala").format("H");
	var minuto = now.tz("America/Guatemala").format("m");
	var dia = now.tz("America/Guatemala").format("d");

	//console.log("[Brito] :: [validarHorario] :: [NOW] :: "+ now +" :: [Hora] :: "+ hora +" :: [Minuto] :: "+ minuto +" :: [Dia] :: "+ dia);

	if(isValidHour(config.horario_FB.OPEN_HOUR, config.horario_FB.OPEN_MINUTE, config.horario_FB.CLOSE_HOUR) && isValidHour(config.horario_FB.OPEN_HOUR, config.horario_FB.CLOSE_MINUTE, config.horario_FB.CLOSE_HOUR))
	{
		if(validar_dia(dia))
		{          
			if(validar_rango_hora(hora, config.horario_FB.OPEN_HOUR, config.horario_FB.CLOSE_HOUR))
			{
				if(hora == config.horario_FB.CLOSE_HOUR)
				{
					if(validar_rango_minuto(minuto, config.horario_FB.OPEN_MINUTE, config.horario_FB.CLOSE_MINUTE))
					{
						return true;
					}
					else
					{
						console.log('[Brito] :: [validarHorario] :: [Minuto False]');
						return false;
					}
				}
				else
				{
					//console.log('[Brito] :: [validarHorario] :: [Hora true es diferente a la hora fin] :: [Hora del Sistema] :: '+ hora +" :: [CLOSE_HOUR] :: "+ config.horario_FB.CLOSE_HOUR);
					return true;
				}
			}
			else
			{
				console.log('[Brito] :: [validarHorario] :: [Hora False]');
				return false;
			}
		}
		else
		{
			return false;
		}
	}
	else
	{
		console.log('[Brito] :: [No cumple con los requisitos: Se ingresaron numeros negativos o fuera del rango establecido.]');
		return false;
	}
}

validarHorario_TW = function()
{
	var now = moment();
	fecha_actual = now.tz("America/Guatemala").format("YYYY-MM-DD hh:mm:ss");

	//console.log("[Brito] :: [validarHorario] :: [NOW] :: ", now);
	var hora = now.tz("America/Guatemala").format("H");
	var minuto = now.tz("America/Guatemala").format("m");
	var dia = now.tz("America/Guatemala").format("d");

	//console.log("[Brito] :: [validarHorario] :: [NOW] :: "+ now +" :: [Hora] :: "+ hora +" :: [Minuto] :: "+ minuto +" :: [Dia] :: "+ dia);

	if(isValidHour(config.horario_TW.OPEN_HOUR, config.horario_TW.OPEN_MINUTE,config.horario_TW.CLOSE_HOUR) && isValidHour(config.horario_TW.OPEN_HOUR, config.horario_TW.CLOSE_MINUTE, config.horario_TW.CLOSE_HOUR))
	{
		if(validar_dia(dia))
		{          
			if(validar_rango_hora(hora, config.horario_TW.OPEN_HOUR, config.horario_TW.CLOSE_HOUR))
			{
				if(hora == config.horario_TW.CLOSE_HOUR)
				{
					if(validar_rango_minuto(minuto, config.horario_TW.OPEN_MINUTE, config.horario_TW.CLOSE_MINUTE))
					{
						return true;
					}
					else
					{
						console.log('[Brito] :: [validarHorario] :: [Minuto False]');
						return false;
					}
				}
				else
				{
					//console.log('[Brito] :: [validarHorario] :: [Hora true es diferente a la hora fin] :: [Hora del Sistema] :: '+ hora +" :: [CLOSE_HOUR] :: "+ config.horario_TW.CLOSE_HOUR);
					return true;
				}
			}
			else
			{
				console.log('[Brito] :: [validarHorario] :: [Hora False]');
				return false;
			}
		}
		else
		{
			return false;
		}
	}
	else
	{
		console.log('[Brito] :: [No cumple con los requisitos: Se ingresaron numeros negativos o fuera del rango establecido.]');
		return false;
	}
}

exports.validarHorario_WA = validarHorario_WA;
exports.validarHorario_FB = validarHorario_FB;
exports.validarHorario_TW = validarHorario_TW;