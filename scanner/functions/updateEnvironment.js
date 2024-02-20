function updateEnvironment(callback) {
    var env = getServiceEnv(service, self._basePort);

    service.instances(true, function(err, instances) {
      if (err) return callback(err);

      debug('updateInstanceEnv: svc %j instances: %s',
            service.id, instances.map(function(i) {
              return i.id;
            }).join(', '));

      async.each(instances, updateInstanceEnv, callback);

      function updateInstanceEnv(instance, callback) {
        // Override env so strong-trace returns the instanceId as the hostname
        env.STRONGLOOP_TRACES_ID = String(instance.id);
        self._server.updateInstanceEnv(instance.id, env, callback);
      }
    });
  }