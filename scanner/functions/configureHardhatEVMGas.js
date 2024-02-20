function configureHardhatEVMGas(networkConfig, api){
  networkConfig.allowUnlimitedContractSize = true;
  networkConfig.blockGasLimit = api.gasLimitNumber;
  networkConfig.gas =  api.gasLimit;
  networkConfig.gasPrice = api.gasPrice;
  networkConfig.initialBaseFeePerGas = 0;
}