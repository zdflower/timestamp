
var http = require('http');
var url = require('url');

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
}


var server = http.createServer(function (req, resp){
    if (req.method !== 'GET') {
        return res.end('send me a GET\n')
    }
    var url_obj = url.parse(req.url, true); //"devuelve un objeto con los atributos pertinentes" ???

    //tenés que chequear si está en formato unixtime, natural o ninguno
    var fecha = url_obj.pathname

    resp.writeHead(200, { 'Content-Type': 'application/json' })
    resp.write(JSON.stringify(getJson(fecha)));
    resp.end();
        
});
server.listen(Number(process.argv[2]));