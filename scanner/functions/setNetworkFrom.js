function setNetworkFrom(networkConfig, accounts){
  if (!networkConfig.from){
    networkConfig.from = accounts[0];
  }
}