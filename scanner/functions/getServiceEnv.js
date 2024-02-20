function getServiceEnv(service, basePort) {
  var hostEnv = _.pick(process.env, 'STRONGLOOP_LICENSE');
  var servicePortEnv = {PORT: String(basePort + service.id)};
  return _.merge(hostEnv, servicePortEnv, service.env);
}