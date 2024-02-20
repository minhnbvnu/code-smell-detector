function getBlueprintHelper(yargs, blueprintName) {
  const blueprintCommand = helpers.getBlueprintCommand(blueprintName);
  if (blueprintCommand) {
    blueprintCommand
      .builder(yargs)
      .updateStrings({ 'Options:': 'Blueprint Options:' });
    return yargs;
  } else {
    helpers.logMissingBlueprint(yargs, blueprintName);
  }
}