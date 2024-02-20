function setEnv(server, env, instanceId, rsp, callback) {
  server.updateInstanceEnv(instanceId, env, function(err) {
    if (err) {
      rsp.error = err.message;
    } else {
      rsp.message = 'ok';
    }
    return callback(rsp);
  });
}