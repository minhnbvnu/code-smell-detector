function normaliseContractPath (contractPath) {
  // If the current platform is not Windows, the path does not need to be changed
  if (process.platform !== 'win32') return contractPath
  // If the contract path doesn't start with '/[A-Z]/' it is not a Unixified Windows path
  if (!contractPath.match(/^\/[A-Z]\//i)) return contractPath
  const driveLetter = contractPath.substring(1, 2)
  const normalisedContractPath = path.resolve(`${driveLetter}:/${contractPath.substring(3)}`)
  return normalisedContractPath
}