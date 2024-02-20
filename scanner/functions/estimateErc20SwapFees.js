async function estimateErc20SwapFees({
  erc20Address,
  swapAddress,
  ethAccount,
}) {
  if (!erc20Address) {
    return estimateEthSwapFees({ swapAddress });
  }

  const erc20 = new web3.eth.Contract(ERC20_ABI, erc20Address);
  const decimals = parseInt(await erc20.methods.decimals().call(), 10);

  const approveAmount = addDecimals('100000000', decimals);

  let approveEstimatedGas = await erc20.methods
    .approve(swapAddress, approveAmount)
    .estimateGas({ from: ethAccount });
  // Account for Metamask over-estimation
  approveEstimatedGas *= 1.5;

  // Use estimated gas limit for now
  const swapEstimatedGas = SUGGESTED_GAS_LIMIT;

  const gasPrice = (await web3.eth.getGasPrice()) * 1e-18;

  return [approveEstimatedGas * gasPrice, swapEstimatedGas * gasPrice];
}