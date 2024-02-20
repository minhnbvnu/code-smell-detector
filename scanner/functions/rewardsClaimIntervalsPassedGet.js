async function rewardsClaimIntervalsPassedGet(txOptions) {
  // Load contracts
  const rocketRewardsPool = await RocketRewardsPool.deployed();
  return await rocketRewardsPool.getClaimIntervalsPassed.call();
}