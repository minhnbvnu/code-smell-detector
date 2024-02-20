function populateMethod(req) {
  req.httpRequest.method = req.service.api.operations[req.operation].httpMethod;
}