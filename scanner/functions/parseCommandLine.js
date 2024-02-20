function parseCommandLine() {
  const options = yargs(process.argv.slice(1)).wrap(100);

  options.alias('t', 'test').boolean('t').describe('t', 'Run the specs and exit with error code on failures.');

  const argv = options.argv;

  return {
    test: argv.test
  };
}