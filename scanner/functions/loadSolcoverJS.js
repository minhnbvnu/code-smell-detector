function loadSolcoverJS(config={}){
  let solcoverjs;
  let coverageConfig;
  let log = config.logger ? config.logger.log : console.log;
  let ui = new PluginUI(log);

  // Handle --solcoverjs flag
  (config.solcoverjs)
    ? solcoverjs = path.join(config.workingDir, config.solcoverjs)
    : solcoverjs = path.join(config.workingDir, '.solcover.js');

  // Catch solcoverjs syntax errors
  if (shell.test('-e', solcoverjs)){

    try {
      coverageConfig = require(solcoverjs);
    } catch(error){
      error.message = ui.generate('solcoverjs-fail') + error.message;
      throw new Error(error)
    }

  // Config is optional
  } else {
    coverageConfig = {};
  }

  // viaIR is eval'd in `nomiclab.utils.normalizeConfig`
  coverageConfig.viaIR = config.viaIR;

  coverageConfig.log = log;
  coverageConfig.cwd = config.workingDir;
  coverageConfig.originalContractsDir = config.contractsDir;

  // Solidity-Coverage writes to Truffle config
  config.mocha = config.mocha || {};

  if (coverageConfig.mocha && typeof coverageConfig.mocha === 'object'){
    config.mocha = Object.assign(
      config.mocha,
      coverageConfig.mocha
    );
  }

  // Per fvictorio recommendation in #691
  if (config.mocha.parallel) {
    const message = ui.generate('mocha-parallel-fail');
    throw new Error(message);
  }

  return coverageConfig;
}