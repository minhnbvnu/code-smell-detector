function updateInstanceEnv(instance, callback) {
        // Override env so strong-trace returns the instanceId as the hostname
        env.STRONGLOOP_TRACES_ID = String(instance.id);
        self._server.updateInstanceEnv(instance.id, env, callback);
      }