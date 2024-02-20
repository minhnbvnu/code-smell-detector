function handleResponse(response, callback) {
  let body = '';
  const { headers, statusCode } = response
  const hasError = statusCode >= 300;

  response.setEncoding('utf8');

  response.on('data', function (data) {
    body += data;
  });

  response.on('end', function () {
    callback(hasError ? body : null, hasError ? null : body, statusCode, headers);
  });
}