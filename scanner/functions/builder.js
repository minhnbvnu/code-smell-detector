function builder(yargs) {
  return yargs.command([add, get, show]).help().alias("h", "help");
}