function getBlueprintListHelper(yargs) {
  return helpers
    .getBlueprintCommands()
    .reduce((yargs, command) => yargs.command(command), yargs)
    .updateStrings({ 'Commands:': 'Blueprints:' });
}