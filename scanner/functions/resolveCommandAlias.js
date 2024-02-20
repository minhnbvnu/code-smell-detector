function resolveCommandAlias(command, parser) {
  const commands = getCommands(parser);
  const resolved =
    commands.find(
      cmd => cmd.name === command || cmd.aliases.find(a => a === command)
    ) || {};
  return resolved.name || command;
}