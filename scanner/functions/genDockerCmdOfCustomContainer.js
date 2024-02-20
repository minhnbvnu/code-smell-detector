function genDockerCmdOfCustomContainer(functionProps) {
  const command = functionProps.CustomContainerConfig.Command ? JSON.parse(functionProps.CustomContainerConfig.Command) : undefined;
  const args = functionProps.CustomContainerConfig.Args ? JSON.parse(functionProps.CustomContainerConfig.Args) : undefined;

  if (command && args) {
    return [...functionProps.CustomContainerConfig.Command, ...functionProps.CustomContainerConfig.Args];
  } else if (command) {
    return command;
  } else if (args) {
    return args;
  }
  return [];
}