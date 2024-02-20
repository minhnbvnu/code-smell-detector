function getEnv(server, instanceId, rsp, callback) {
  server.getInstanceEnv(instanceId, function(err, env) {
    if (err) {
      rsp.error = err.message;
    } else {
      rsp.env = env;
    }
    return callback(rsp);
  });
}