async function getDeployedContractInstance(info, provider){
  const ethersProvider = new ethers.providers.Web3Provider(provider);
  const signer = ethersProvider.getSigner();
  const factory = new ethers.ContractFactory(
    getABI(info.solcOutput),
    getBytecode(info.solcOutput),
    signer
  )

  const contract = await factory.deploy();
  await contract.deployTransaction.wait();

  return contract;
}