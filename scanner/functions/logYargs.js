function logYargs(yargs, message) {
  if (message) {
    yargs._getLoggerInstance().error(message);
  }
}