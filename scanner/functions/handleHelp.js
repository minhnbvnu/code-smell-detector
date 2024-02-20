function handleHelp(argv, yargs) {
  const [_, blueprintName] = argv._;
  const helper = blueprintName
    ? helpers.getBlueprintHelper(yargs, blueprintName)
    : helpers.getBlueprintListHelper(yargs);

  if (helper) {
    helper.showHelp();
  }
}