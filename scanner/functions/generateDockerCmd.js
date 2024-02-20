function generateDockerCmd(runtime, isLocalStartInit, { functionProps, httpMode, invokeInitializer = true, event = null }) {
  if (isCustomContainerRuntime(runtime)) {
    return genDockerCmdOfCustomContainer(functionProps);
  } else if (isLocalStartInit) {
    return ['--server'];
  }
  return genDockerCmdOfNonCustomContainer(functionProps, httpMode, invokeInitializer, event);
}