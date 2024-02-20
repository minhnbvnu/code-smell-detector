async function generateContainerBuildOpts(runtime, containerName, mounts, cmd, envs, preferredImage) {

  const hostOpts = {
    HostConfig: {
      AutoRemove: true,
      Mounts: mounts
    }
  };

  const ioOpts = {
    OpenStdin: true,
    Tty: false,
    StdinOnce: true,
    AttachStdin: true,
    AttachStdout: true,
    AttachStderr: true
  };

  const imageName = await resolveRuntimeToDockerImage(runtime, true);

  const opts = nestedObjectAssign(
    {
      Env: resolveDockerEnv(envs),
      Image: preferredImage || imageName,
      name: containerName,
      Cmd: cmd,
      User: resolveDockerUser({ stage: 'build' })
    },
    ioOpts,
    hostOpts);


  debug('fc-docker docker options: %j', opts);

  return opts;
}