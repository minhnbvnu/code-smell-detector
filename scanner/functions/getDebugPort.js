function getDebugPort(options) {
  let debugPort = options.debugPort;

  if (debugPort) {
    debugPort = parseInt(debugPort);

    if (Number.isNaN(debugPort)) {
      throw Error(red('debugPort must be number'));
    }
  }

  debug(`debugPort: ${debugPort}`);

  return debugPort;
}