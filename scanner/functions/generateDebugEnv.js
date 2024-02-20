function generateDebugEnv(runtime, debugPort, debugIde) {
  const remoteIp = ip.address();

  switch (runtime) {
  case 'nodejs12':
  case 'nodejs10':
  case 'nodejs8':
    return { 'DEBUG_OPTIONS': `--inspect-brk=0.0.0.0:${debugPort}` };
  case 'nodejs6':
    return { 'DEBUG_OPTIONS': `--debug-brk=${debugPort}` };
  case 'python2.7':
  case 'python3':
    if (debugIde === IDE_PYCHARM) {
      return {};
    }
    return { 'DEBUG_OPTIONS': `-m ptvsd --host 0.0.0.0 --port ${debugPort} --wait` };

  case 'java8':
  case 'java11':
    return { 'DEBUG_OPTIONS': `-agentlib:jdwp=transport=dt_socket,server=y,suspend=y,quiet=y,address=${debugPort}` };
  case 'php7.2':
    console.log(`using remote_ip ${remoteIp}`);
    return { 'XDEBUG_CONFIG': `remote_enable=1 remote_autostart=1 remote_port=${debugPort} remote_host=${remoteIp}` };
  case 'dotnetcore2.1':
    return { 'DEBUG_OPTIONS': 'true' };
  default:
    throw new Error(red('could not found runtime.'));
  }
}