function promisifiedKiteAPIRequest(req, data) {
  return KiteAPI.request(req, data).then(resp => promisifyReadResponse(resp));
}