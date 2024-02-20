function iterateInitializeDrizzleSagaToNetworkMismatch(drizzle, options, networkId) {
  // Iterate to 3rd effect in initializeDrizzle generator
  let gen = initializeDrizzle({drizzle, options})
  let next = gen.next() // initializeWeb3
  const fakeWeb3 = {eth: {}};
  next = gen.next(fakeWeb3) // getNetworkId

  // Replace saga networkId with our own
  return gen.next(networkId) // networkWhitelist
}