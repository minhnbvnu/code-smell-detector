function buildRcArgs(cwd, args) {
  const config = getRcConfigForCwd(cwd, args);

  const argsForCommands = new Map();

  for (const key in config) {
    // args can be prefixed with the command name they're meant for, eg.
    // `--install.check-files true`
    const keyMatch = key.match(/^--(?:([^.]+)\.)?(.*)$/);
    if (!keyMatch) {
      continue;
    }

    const commandName = keyMatch[1] || '*';
    const arg = keyMatch[2];
    const value = config[key];

    // create args for this command name if we didn't previously have them
    const args = argsForCommands.get(commandName) || [];
    argsForCommands.set(commandName, args);

    // turn config value into appropriate cli flag
    const option = (_commander || _load_commander()).default.optionFor(`--${arg}`);

    // If commander doesn't recognize the option or it takes a value after it
    if (!option || option.optional || option.required) {
      args.push(`--${arg}`, value);
    } else if (value === true) {
      // we can't force remove an arg from cli
      args.push(`--${arg}`);
    }
  }

  return argsForCommands;
}