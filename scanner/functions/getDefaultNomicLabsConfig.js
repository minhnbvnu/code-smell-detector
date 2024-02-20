function getDefaultNomicLabsConfig(){
  const logger = process.env.SILENT ? { log: () => {} } : console;
  const reporter = process.env.SILENT ? 'dot' : 'spec';

  const mockwd = path.join(process.cwd(), temp);
  const vals = {
    paths : {
      root: mockwd,
      artifacts:  path.join(mockwd, 'artifacts'),
      cache:  path.join(mockwd, 'cache'),
      sources: path.join(mockwd, 'contracts'),
      tests: path.join(mockwd, 'test'),
    },
    logger: logger,
    mocha: {
      reporter: reporter
    },
    networks: {
      development: {
        url: "http://127.0.0.1:8545",
      }
    }
  }

  return vals;
}