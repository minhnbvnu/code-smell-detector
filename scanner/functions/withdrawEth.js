async function withdrawEth(from, withdrawal, callAsync) {
  const { params, signature } = withdrawal.txData;
  const swap = new web3.eth.Contract(SWAP_ABI, params[1]);
  let method, nonce;
  if (params[0] === 'withdrawErc20') {
    method = swap.methods.withdrawErc20(
      params[2],
      params[3],
      params[4],
      params[5],
      signature,
    );
    nonce = params[5];
  } else if (params[0] === 'withdrawEth') {
    method = swap.methods.withdrawEth(
      params[2],
      params[3],
      params[4],
      signature,
    );
    nonce = params[4];
  } else {
    return;
  }
  if (pendingNonces.has(nonce)) {
    return;
  }
  try {
    await method.estimateGas();
  } catch (e) {
    return;
  }
  pendingNonces.add(nonce);
  await callAsync(method.send({ from, gasLimit: SUGGESTED_GAS_LIMIT }), {
    progressMessage: `Completing ${withdrawal.coin.ticker} transfer...`,
  });
  pendingNonces.delete(nonce);
}