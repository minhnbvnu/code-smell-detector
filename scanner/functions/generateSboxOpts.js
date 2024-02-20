function generateSboxOpts({imageName, hostname, mounts, envs, cmd = [], isTty, isInteractive}) {
  return {
    Image: imageName,
    Hostname: hostname,
    AttachStdin: isInteractive,
    AttachStdout: true,
    AttachStderr: true,
    User: resolveDockerUser({ stage: 'sbox' }),
    Tty: isTty,
    OpenStdin: isInteractive,
    StdinOnce: true,
    Env: resolveDockerEnv(envs),
    Cmd: cmd.length ? cmd : ['/bin/bash'],
    HostConfig: {
      AutoRemove: true,
      Mounts: mounts
    }
  };
}