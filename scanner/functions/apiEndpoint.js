function apiEndpoint (network) {
  switch (network) {
    case 'goerli':
      return 'https://api-goerli.etherscan.io/api'
    case 'mainnet':
      return 'https://api.etherscan.io/api'
  }
  throw new Error(`Unknown network ${network}`)
}