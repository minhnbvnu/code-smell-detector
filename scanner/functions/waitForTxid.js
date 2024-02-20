function waitForTxid(tx) {
  return new Promise((resolve, reject) => {
    tx.once('transactionHash', resolve).catch(reject);
  });
}