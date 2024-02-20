async function getErc20Balance(account, erc20Address) {
  if (!erc20Address) {
    return parseInt(await web3.eth.getBalance(account)) / 1e18;
  }

  const erc20 = new web3.eth.Contract(ERC20_ABI, erc20Address);
  const [value, decimals] = await Promise.all([
    erc20.methods.balanceOf(account).call(),
    erc20.methods.decimals().call(),
  ]);
  return parseInt(value, 10) / 10 ** parseInt(decimals, 10);
}