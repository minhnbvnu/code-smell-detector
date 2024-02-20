function serveFile(req, res){
  if(req.method == "GET"){
    if( req.url.indexOf("favicon") > -1 ){
      log("HTTP: inbound request, served nothing, (favicon)");

      res.writeHead(200, {'Content-Type': 'image/x-icon'});
      res.end("");
    } else {
      log("HTTP: inbound request, served client.html");
      res.writeHead(200, {'Content-Type': 'text/html', 'Connection': 'close'});
      readPage("client.html", function(data){
        data.forEach(function(datum){
          res.write(datum);
        });
        
        res.end();
      });
    }
  } else {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end();
  }
}