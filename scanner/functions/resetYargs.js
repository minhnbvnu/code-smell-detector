function resetYargs(yargs) {
  return yargs
    .reset()
    .help(false)
    .version(false)
    .exitProcess(true)
    .wrap(yargs.terminalWidth());
}