function getBlueprintCommand(blueprintName) {
  return buildBlueprintCommands().find(
    command =>
      command.command.match(blueprintName) ||
      command.aliases.find(alias => alias === blueprintName)
  );
}