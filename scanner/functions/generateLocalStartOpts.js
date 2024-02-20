async function generateLocalStartOpts(runtime, name, mounts, cmd, envs, { debugPort, dockerUser, debugIde, imageName, caPort = 9000 }) {
  if (isCustomContainerRuntime(runtime)) {
    return genCustomContainerLocalStartOpts(name, mounts, cmd, envs, imageName, caPort);
  }
  return await genNonCustomContainerLocalStartOpts(runtime, name, mounts, cmd, debugPort, envs, dockerUser, debugIde);
}