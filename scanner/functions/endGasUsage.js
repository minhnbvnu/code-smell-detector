async function endGasUsage() {
  const endBlock = await web3.eth.getBlockNumber();

  const describeName = this.currentTest.parent.title;
  const testName = this.currentTest.title;
  let gasUsed = 0;

  if (!describes.hasOwnProperty(describeName)) {
    describes[describeName] = {
      name: describeName,
      gasUsed: 0,
      tests: []
    }
  }

  // Loop through all blocks since test started and sum gasUsed on transactions
  for (let i = startBlock + 1; i <= endBlock; i++){
    const block = await web3.eth.getBlock(i);
    gasUsed += block.gasUsed;
  }

  totalGasUsage += gasUsed;
  describes[describeName].gasUsed += gasUsed;
  describes[describeName].tests.push({
    name: testName,
    gasUsed: gasUsed
  })
}