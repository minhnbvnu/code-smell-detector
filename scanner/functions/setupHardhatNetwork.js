async function setupHardhatNetwork(env, api, ui){
  const hardhatPackage = require('hardhat/package.json');
  const { createProvider } = require("hardhat/internal/core/providers/construction");
  const { HARDHAT_NETWORK_NAME } = require("hardhat/plugins")

  // after 2.15.0, the internal createProvider function has a different signature
  const newCreateProviderSignature = semver.satisfies(hardhatPackage.version, "^2.15.0");

  let provider, networkName, networkConfig;

  // HardhatEVM
  networkConfig = env.network.config;
  configureHardhatEVMGas(networkConfig, api);

  if (newCreateProviderSignature) {
    provider = await createProvider(
      env.config,
      HARDHAT_NETWORK_NAME,
      env.artifacts,
    )
  } else {
    provider = createProvider(
      HARDHAT_NETWORK_NAME,
      networkConfig,
      env.config.paths,
      env.artifacts,
    )
  }

  return configureNetworkEnv(
    env,
    HARDHAT_NETWORK_NAME,
    networkConfig,
    provider
  )
}