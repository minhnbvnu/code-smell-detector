function getABI(solcOutput, testFile="test.sol", testName="Test"){
  return solcOutput.contracts[testFile][testName].abi;
}