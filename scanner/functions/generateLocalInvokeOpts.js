async function generateLocalInvokeOpts(runtime, containerName, mounts, cmd, debugPort, envs, dockerUser, debugIde) {
  const hostOpts = {
    HostConfig: {
      AutoRemove: true,
      Mounts: mounts
    }
  };

  let debugOpts = {};

  if (debugPort) {
    debugOpts = generateDockerDebugOpts(runtime, debugPort, debugIde);
  }

  const ioOpts = {
    OpenStdin: true,
    Tty: false,
    StdinOnce: true,
    AttachStdin: true,
    AttachStdout: true,
    AttachStderr: true
  };

  const imageName = await resolveRuntimeToDockerImage(runtime);

  supportCustomBootstrapFile(runtime, envs);

  const opts = nestedObjectAssign(
    {
      Env: resolveDockerEnv(envs),
      Image: imageName,
      name: containerName,
      Cmd: cmd,
      User: dockerUser
    },
    ioOpts,
    hostOpts,
    debugOpts);


  debug('fc-docker docker options: %j', opts);

  return opts;
}