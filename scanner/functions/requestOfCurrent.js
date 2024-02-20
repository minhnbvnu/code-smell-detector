function requestOfCurrent(server, instanceId, req, callback) {
  req.cmd = req.sub;
  server.requestOfInstance(instanceId, req, callback);
}