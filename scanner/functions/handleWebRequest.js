function handleWebRequest(request, response) {
  log ("Received request for " + request.url);
  response.writeHead(404);
  response.end();
}