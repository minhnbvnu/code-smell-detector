async function getNodeStakingMinipoolCount(nodeAddress) {
  const rocketMinipoolManager = await RocketMinipoolManager.deployed();
  let count = await rocketMinipoolManager.getNodeStakingMinipoolCount.call(nodeAddress);
  return count;
}