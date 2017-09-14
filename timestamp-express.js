
var url = require('url');
var express = require('express')
var app = express()

//TODO
function unixOrNatural(fecha){
  return false
}

//TODO
function getJson(fecha){
  var json = {"unixtime": null, "natural": null};
  if (unixOrNatural(fecha)){
      json["unixtime"] = "fechaenformatounixtime"
      json["natural"] = "fechaenformatonatural"
  }
  return json
}

app.get('/', function(req, res) {
  var url_obj = url.parse(req.url, true)
  //tenés que chequear si está en formato unixtime, natural o ninguno
  var fecha = url_obj.pathname
  res.writeHead(200, { 'Content-Type': 'application/json' })
  res.write(JSON.stringify(getJson(fecha)));
  res.end()
})
app.listen(3000)