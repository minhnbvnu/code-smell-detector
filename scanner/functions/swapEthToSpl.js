async function swapEthToSpl({
  ethAccount,
  swapAddress,
  destination,
  amount,
  onStatusChange,
}) {
  const swap = new web3.eth.Contract(SWAP_ABI, swapAddress);

  const encodedAmount = addDecimals(amount, 18);
  const swapTx = swap.methods
    .swapEth(destination)
    .send({ from: ethAccount, value: encodedAmount });
  const swapTxid = await waitForTxid(swapTx);

  onStatusChange({ step: 2, txid: swapTxid, confirms: 0 });

  await Promise.all([swapTx, waitForConfirms(swapTx, onStatusChange)]);

  onStatusChange({ step: 3 });
}