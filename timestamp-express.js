'use strict';

var express = require('express')
var app = express()

const meses = {"january": 31, "february": 29, "march": 31, "april": 30, "may": 31, "june": 30, "july": 31, "august": 31, "september": 30, "october": 31, "november": 30, "december": 31}

function esUnixtime(fecha){
  // es unixtime si fecha es un entero y además 
  // -999999999999 <= fecha <= 999999999999
  fecha = Number(fecha)
  return (fecha >= -999999999999) && (fecha <= 999999999999)
} 

function esNaturalTime(fecha){
  //el formato propuesto es "Mes n, yyyy", donde Mes es uno de ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  // 1 <= n <= 31 si Mes es enero, marzo, mayo, julio, agosto, octubre, diciembre
  // 1 <= n <= 30 si Mes es abril, junio, septiembre, noviembre
  // 1 <= n <= 28 si Mes es febrero y yyyy no es bisiesto
  // 1 <= n <= 29 si Mes es febrero y yyyy es bisiesto

  //voy a simplificar y no voy a chequear si el año es bisiesto o no
  
  //podría tomar fecha y partirlo por la coma
  //ver si quedó un array con dos elementos
  //ver si el segundo es un número entero ¿positivo? ¿de hasta cuántas cifras?
  //digamos que es un número natural (no tenemos en cuenta años A.C.)
  // de 0 a  99999
  //con el primero partirlo por los espacios, ver si quedó un array de 2 elementos, ver si el primero está en meses y si el segundo es un número menor o igual que meses[primerelem], acá tiene el detalle de que toma como igualmente válido 02, 2, 002, etc.
  var natural = fecha.split(',')
  if (natural.length == 2){
    if (natural[1] <=  99999 && natural[1] >= 0){
      var mesdia = natural[0].split(" ")
      if (mesdia.length == 2){
        if (Object.keys(meses).includes(mesdia[0].toLowerCase())){
          if (mesdia[1] <= meses[mesdia[0].toLowerCase()]) {
            return true
          }
        }
      }
    }
  }

  return false
}

//TODO
function unix2natural(fecha){
  return "unix2natural"
}

//TODO
function natural2unix(fecha){
  return "natural2unix"
}


function getJson(fecha){
  var json = {"unixtime": null, "natural": null};
  if (esUnixtime(fecha)){
      json["unixtime"] = fecha
      json["natural"] = unix2natural(fecha)
  }
  else if (esNaturalTime(fecha)){
    json["unixtime"] = natural2unix(fecha)
    json["natural"] = fecha
  }

  return json
}


//uso de rutas dinámicas
//https://www.tutorialspoint.com/expressjs/expressjs_url_building.htm
//uso req.params en vez del módulo url
app.get('/:time', function(req, res) {
  var fecha = req.params.time
  
  res.writeHead(200, { 'Content-Type': 'application/json' })
  res.write(JSON.stringify(getJson(fecha)));
  res.end()
})
app.listen(3000)