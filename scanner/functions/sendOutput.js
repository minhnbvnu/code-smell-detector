function sendOutput(http_code, res, body, headers, type) {
  if (headers) {
    res.writeHead(http_code, headers);
  } else {
    res.writeHead(http_code, {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json'
    });
  }
  if (body && body !== '') {
    if (type) {
      res.write(body, type);
    } else {
      res.write(body);
    }
  }
  res.end();
}