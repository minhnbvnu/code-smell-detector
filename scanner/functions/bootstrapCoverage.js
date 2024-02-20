async function bootstrapCoverage(file, api, provider){
  const info = instrumentAndCompile(file, api);

  // Need to define a gasLimit for contract calls because otherwise ethers will estimateGas
  // and cause duplicate hits for everything
  info.gas = { gasLimit: 2_000_000 }
  info.instance = await getDeployedContractInstance(info, provider);

  // Have to do this after the deployment call because provider initializes on send
  await api.attachToHardhatVM(provider);

  api.collector._setInstrumentationData(info.data);
  return info;
}