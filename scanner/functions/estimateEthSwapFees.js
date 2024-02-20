async function estimateEthSwapFees() {
  const estimatedGas = SUGGESTED_GAS_LIMIT;

  const gasPrice = (await web3.eth.getGasPrice()) * 1e-18;

  return estimatedGas * gasPrice;
}