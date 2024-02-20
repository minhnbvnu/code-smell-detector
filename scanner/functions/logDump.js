function logDump(server, instanceId, rsp) {
  rsp.log = server.dumpInstanceLog(instanceId);

  if (rsp.log == null) {
    rsp.message = 'No application running, no log to dump';
  }

  return rsp;
}