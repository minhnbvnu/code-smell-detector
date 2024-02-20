function collectTestMatrixData(args, env, api){
  if (args.matrix){
    mochaConfig = env.config.mocha || {};
    mochaConfig.reporter = api.matrixReporterPath;
    mochaConfig.reporterOptions = {
      collectTestMatrixData: api.collectTestMatrixData.bind(api),
      saveMochaJsonOutput: api.saveMochaJsonOutput.bind(api),
      cwd: api.cwd
    }
    env.config.mocha = mochaConfig;
  }
}