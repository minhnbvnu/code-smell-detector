function generateDockerDebugOpts(runtime, debugPort, debugIde) {
  const exposedPort = `${debugPort}/tcp`;

  if (debugIde === IDE_PYCHARM) {
    if (runtime !== 'python2.7' && runtime !== 'python3') {
      throw new Error(`${yellow(IDE_PYCHARM)} debug config only support for runtime [python2.7, python3]`);
    } else {
      return {};
    }
  } else if (runtime === 'php7.2') {
    return {};
  } else {
    return {
      ExposedPorts: {
        [exposedPort]: {}
      },
      HostConfig: {
        PortBindings: {
          [exposedPort]: [
            {
              'HostIp': '',
              'HostPort': `${debugPort}`
            }
          ]
        }
      }
    };
  }
}