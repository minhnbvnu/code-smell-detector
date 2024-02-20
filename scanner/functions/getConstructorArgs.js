async function getConstructorArgs (txHash, bytecode) {
  const tx = await web3.eth.getTransaction(txHash)
  const input = tx.input
  const constructorArgs = input.substring(bytecode.length)
  return constructorArgs
}