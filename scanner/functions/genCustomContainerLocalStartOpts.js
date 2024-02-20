function genCustomContainerLocalStartOpts(name, mounts, cmd, envs, imageName, caPort = 9000) {
  const exposedPort = `${caPort}/tcp`;
  const hostOpts = {
    ExposedPorts: {
      [exposedPort]: {}
    },
    HostConfig: {
      AutoRemove: true,
      Mounts: mounts,
      PortBindings: {
        [exposedPort]: [
          {
            'HostIp': '',
            'HostPort': `${caPort}`
          }
        ]
      }
    }
  };

  const opts = {
    Env: resolveDockerEnv(envs, true),
    Image: imageName,
    name
  };
  if (cmd !== []) {
    opts.Cmd = cmd;
  }
  const ioOpts = {
    OpenStdin: true,
    Tty: false,
    StdinOnce: true,
    AttachStdin: true,
    AttachStdout: true,
    AttachStderr: true
  };
  const dockerOpts = nestedObjectAssign(opts, hostOpts, ioOpts);
  debug('docker options for custom container: %j', dockerOpts);
  return dockerOpts;
}