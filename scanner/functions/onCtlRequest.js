function onCtlRequest(options, req, callback) {
  debug('request %j', req);

  // Default to service/instance 1 for compatibility with older clients
  var instanceId = req.instanceId || '1';
  var server = options.server;
  var cmd = req.cmd;
  var rsp = {}; // Clear this response if the handler will callback itself.

  switch (cmd) {
    case 'shutdown':
      rsp = shutdown(server, rsp);
      break;

    case 'start':
      rsp = start(server, instanceId, rsp, callback);
      break;

    case 'stop':
      rsp = stop(server, 'hard', instanceId, rsp, callback);
      break;

    case 'soft-stop':
      rsp = stop(server, 'soft', instanceId, rsp, callback);
      break;

    case 'restart':
      rsp = restart(server, 'hard', instanceId, rsp, callback);
      break;

    case 'soft-restart':
      rsp = restart(server, 'soft', instanceId, rsp, callback);
      break;

    case 'env-set':
      rsp = setEnv(server, req.env, instanceId, rsp, callback);
      break;

    case 'env-get':
      // configured only, not actual environment
      // XXX(sam) supervisor now supports getting the actual env
      rsp = getEnv(server, instanceId, rsp, callback);
      break;

    case 'log-dump':
      rsp = logDump(server, instanceId, rsp, callback);
      break;

    case 'current': // Pass-through to current
      rsp = requestOfCurrent(server, instanceId, req, callback);
      break;

    default:
      rsp.error = 'unsupported';
      break;
  }

  if (rsp) {
    debug('response:', rsp);

    process.nextTick(callback.bind(null, rsp));
  }
}