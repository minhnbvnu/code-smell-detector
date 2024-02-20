function networkToId (network) {
  switch (network) {
    case 'goerli':
      return '5'
    case 'mainnet':
      return '1'
  }
  throw new Error(`Unknown network ${network}`)
}