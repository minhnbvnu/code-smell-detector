function getChalk(options) {
  return options.forceColor ? new Chalk.constructor({
    enabled: true,
    level: 1
  }) : Chalk;
}