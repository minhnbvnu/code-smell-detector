function normalizeConfig(config, args={}){
  let sources;

  (args.sources)
    ? sources = path.join(config.paths.sources, args.sources)
    : sources = config.paths.sources;

  if (config.solidity && config.solidity.compilers.length) {
    config.viaIR = isUsingViaIR(config.solidity);
  }

  config.workingDir = config.paths.root;
  config.contractsDir = sources;
  config.testDir = config.paths.tests;
  config.artifactsDir = config.paths.artifacts;
  config.logger = config.logger ? config.logger : {log: null};
  config.solcoverjs = args.solcoverjs
  config.gasReporter = { enabled: false }
  config.matrix = args.matrix;

  try {
    const hardhatPackage = require('hardhat/package.json');
    if (semver.gt(hardhatPackage.version, '2.0.3')){
      config.useHardhatDefaultPaths = true;
    }
  } catch(e){ /* ignore */ }

  return config;
}