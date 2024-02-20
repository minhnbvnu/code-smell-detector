async function getNodeInfoHardhat(provider){
  return provider.send("web3_clientVersion", [])
}