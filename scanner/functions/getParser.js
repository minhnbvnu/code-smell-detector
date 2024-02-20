function getParser(config = {}) {
  return getYargs()
    .usage(usage)
    .commandDir('cmds')
    .demandCommand(1, 'Provide a command to run')
    .recommendCommands()
    .strict()
    .help()
    .alias('help', 'h')
    .version()
    .alias('version', 'V')
    .global('version', false)
    .epilogue('Documentation: https://github.com/SpencerCDixon/redux-cli')
    .config(config)
    .pkgConf(PACKAGE_KEY)
    .env(ENV_PREFIX);
}