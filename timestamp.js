
var http = require('http');
var url = require('url');

//TODO
function unixOrNatural(fecha){
  return true
}

//TODO
function getJson(fecha){
  var json = {"fecha": fecha, "unixtime": null, "natural": null};
  if (unixOrNatural(fecha)){
      json["unixtime"] = "fechaenformatounixtime"
      json["natural"] = "fechaenformatonatural"
  }
  return json
}


var server = http.createServer(function (req, resp){
    if (req.method !== 'GET') {
        return res.end('send me a GET\n')
    }
    var url_obj = url.parse(req.url, true);
    var fecha = url_obj.pathname

    //console.log(url_obj)

/*    //cuando se pida la página raíz
    if (url_obj.path == '/'){
      //tenés que chequear si está en formato unixtime, natural o ninguno
      resp.writeHead(200, { 'Content-Type': 'application/json' })
      resp.write(JSON.stringify(getJson(fecha)));
      resp.end();	
    }*/

    resp.writeHead(200, { 'Content-Type': 'application/json' })
    resp.write(JSON.stringify(getJson(fecha)));
    resp.end();


});
server.listen(3000);
console.log("Server iniciado");