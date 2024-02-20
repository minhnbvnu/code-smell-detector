function getBlueprintRunner(yargs, blueprintName) {
  const blueprintCommand = helpers.getBlueprintCommand(blueprintName);
  if (blueprintCommand) {
    return yargs
      .reset()
      .command(blueprintCommand)
      .exitProcess(true);
  } else {
    helpers.logMissingBlueprint(yargs, blueprintName);
  }
}