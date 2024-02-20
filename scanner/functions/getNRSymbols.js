function getNRSymbols(thing) {
  const knownSymbols = Object.values(symbols)
  return Object.getOwnPropertySymbols(thing)
    .filter((key) => knownSymbols.includes(key))
    .map((key) => key.toString())
}