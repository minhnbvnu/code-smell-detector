function commandWrapper(component) {
  component.commands = {};

  component.command = function (commandName, callback) {
    registerCommand(component.commands, commandName, callback);
  };

  Object.keys(defaultCommands).forEach((key) => {
    const module = defaultCommands[key];
    const { name, default: callback } = module;

    component.command(name, callback);
  });
}