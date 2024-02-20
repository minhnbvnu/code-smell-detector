function getBytecode(solcOutput, testFile="test.sol", testName="Test"){
  return `0x${solcOutput.contracts[testFile][testName].evm.bytecode.object}`;
}