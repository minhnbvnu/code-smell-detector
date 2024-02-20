async function getAccountsHardhat(provider){
  return provider.send("eth_accounts", [])
}