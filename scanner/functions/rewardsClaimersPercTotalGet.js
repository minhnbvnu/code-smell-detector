async function rewardsClaimersPercTotalGet(txOptions) {
  // Load contracts
  const rocketDAOProtocolSettingsRewards = await RocketDAOProtocolSettingsRewards.deployed();
  return await rocketDAOProtocolSettingsRewards.getRewardsClaimersPercTotal.call();
}