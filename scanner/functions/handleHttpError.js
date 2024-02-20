function handleHttpError(error, response, body) {
  throw `[${response && response.statusCode}] Error while performing http request: ${error}\n${body}`;
}