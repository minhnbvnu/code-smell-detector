function configureNetworkEnv(env, networkName, networkConfig, provider){
  env.config.networks[networkName] = networkConfig;
  env.config.defaultNetwork = networkName;

  env.network = Object.assign(env.network, {
    name: networkName,
    config: networkConfig,
    provider: provider,
    isHardhatEVM: true
  });

  env.ethereum = provider;

  // Return a reference so we can set the from account
  return env.network;
}