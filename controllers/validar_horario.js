var config = require('../config.js');

var dias = config.dias;
var OPEN_HOUR = config.OPEN_HOUR;
var OPEN_MINUTE = config.OPEN_MINUTE;
var CLOSE_HOUR = config.CLOSE_HOUR;
var CLOSE_MINUTE = config.CLOSE_MINUTE;
var offset = config.offset;

function isValidHour(hour, minute) // Verifica si la hora es valida, entre numeros positivos y menores a 24
{
	return (hour > -1 && hour < 24 && minute > -1 && minute < 60) && (OPEN_HOUR <= CLOSE_HOUR);
}

function validar_rango_hora(hour)
{
	console.log("[Brito] :: [Horas] :: [hour >= OPEN_HOUR && hour <= CLOSE_HOUR] :: "+ hour +" :: "+ OPEN_HOUR +" :: "+ hour +" :: "+ CLOSE_HOUR);
	return hour >= OPEN_HOUR && hour <= CLOSE_HOUR;
}

function validar_rango_minuto(minute)
{
	console.log("[Brito] :: [Minutos] :: [minute >= OPEN_MINUTE && minute < CLOSE_MINUTE] :: "+ minute +" :: "+ OPEN_MINUTE +" :: "+ minute +" :: "+ CLOSE_MINUTE);
	return minute >= OPEN_MINUTE && minute < CLOSE_MINUTE;
}

function validar_dia(day)
{
	return dias[day][1]
}

validarHorario = function(OPEN_HOUR, OPEN_MINUTE, CLOSE_HOUR, CLOSE_MINUTE)
{
	var d = new Date();	
	var utc = d.getTime() + (d.getTimezoneOffset() * 60000);
	var now = new Date(utc + (3600000*offset));
	  
	var hora = now.getHours();
	var minuto =now.getMinutes();

	console.log("[Brito] :: [validarHorario] :: [Hora] :: "+ hora +" :: [Minuto] :: "+ minuto);

	var dia = now.getDay();

	console.log("[Brito] :: [validarHorario] :: [NOW] :: "+ now +" :: [Hora] :: "+ hora +" :: [Minuto] :: "+ minuto +" :: [Dia] :: "+ dia);

	if(isValidHour(OPEN_HOUR, OPEN_MINUTE) && isValidHour(CLOSE_HOUR, CLOSE_MINUTE))
	{
		if(validar_dia(dia))
		{          
			if(validar_rango_hora(hora))
			{
				if(hora == CLOSE_HOUR)
				{
					if(validar_rango_minuto(minuto))
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
					console.log('[Brito] :: [validarHorario] :: [Hora true es diferente a la hora fin] :: [Hora del Sistema] :: '+ hora +" :: [CLOSE_HOUR] :: "+ CLOSE_HOUR);
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

exports.validarHorario = validarHorario;