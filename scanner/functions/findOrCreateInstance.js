function findOrCreateInstance(callback) {
    var models = self._meshApp.models;
    var Instance = models.ServiceInstance;

    service.instances(function(err, instances) {
      if (err) return callback(err);
      if (instances.length > 0) return callback();

      debug('onServiceUpdate: create first instance');

      var instance = new Instance({
        executorId: 1,
        serverServiceId: service.id,
        groupId: 1,
        cpus: 'STRONGLOOP_CLUSTER' in process.env ?
          process.env.STRONGLOOP_CLUSTER : 'CPU',

        // allow starting tracing on all instances via env for testing purposes
        tracingEnabled: !!process.env.STRONGLOOP_TRACING || false,
      });
      instance.save(callback);
    });
  }