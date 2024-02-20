function generateHttpParams(req, pathPrefix) {
  const requestURI = req.originalUrl;
  const method = req.method;
  const path = req.path.substring(pathPrefix.length);
  const clientIP = req.ip;
  const host = req.hostname;

  // for nodejs and python and php
  // http://nodejs.cn/api/http.html#http_message_rawheaders
  const headersMap = normalizeRawHeaders(req.rawHeaders);

  const queriesMap = normalizeMultiValues(req.query);

  const params = {
    requestURI,
    method,
    path,
    clientIP,
    queriesMap,
    headersMap,
    host
  };

  const encodedParams = Buffer.from(JSON.stringify(params)).toString('base64');

  return encodedParams;
}