function prepareSandboxFromConfig(config) {
    var sandbox = sinon.create(sinon.sandbox);

    if (config.useFakeServer) {
      if (typeof config.useFakeServer == "object") {
        sandbox.serverPrototype = config.useFakeServer;
      }

      sandbox.useFakeServer();
    }

    if (config.useFakeTimers) {
      if (typeof config.useFakeTimers == "object") {
        sandbox.useFakeTimers.apply(sandbox, config.useFakeTimers);
      } else {
        sandbox.useFakeTimers();
      }
    }

    return sandbox;
  }