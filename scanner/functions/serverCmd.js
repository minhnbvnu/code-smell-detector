function serverCmd(args) {
  const log = new Log({id: 'xvizserver-log'});

  // Enable logging and set the level to the verbose count
  log.enable(true).setLevel(args.v);

  const logger = {
    log: (...msg) => log.log(...msg)(),
    error: (...msg) => log(0, ...msg)(),
    warn: (...msg) => log.log(1, ...msg)(),
    info: (...msg) => log.log(1, ...msg)(),
    verbose: (...msg) => log.log(2, ...msg)()
  };

  const options = {
    ...args,
    logger
  };

  if (args.scenarios) {
    XVIZProviderFactory.addProviderClass(ScenarioProvider);
  }

  const handler = new XVIZProviderHandler(XVIZProviderFactory, options);
  const wss = new XVIZServer([handler], options, () => {
    logger.log(`Listening on port ${wss.server.address().port}`);
  });
}