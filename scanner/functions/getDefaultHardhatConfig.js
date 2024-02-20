function getDefaultHardhatConfig() {
  const config = getDefaultNomicLabsConfig()
  config.defaultNetwork = HARDHAT_NETWORK_NAME;
  config.solidity = {
    version: "0.8.17",
    settings: {
      optimizer: {
        enabled: true
      },
      viaIR: process.env.VIA_IR === "true"
    }
  }
  return config;
}