function getDiffABIs(sourceName, testFile="test.sol", original="Old", current="New"){
  const contract = getCode(`${sourceName}.sol`)
  const solcOutput = compile(contract)
  return {
    original: {
      contractName: "Test",
      sha: "d8b26d8",
      abi: solcOutput.contracts[testFile][original].abi,
    },
    current: {
      contractName: "Test",
      sha: "e77e29d",
      abi: solcOutput.contracts[testFile][current].abi,
    }
  }
}