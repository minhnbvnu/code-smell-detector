async function rewardsClaimIntervalTimeGet(txOptions) {
  // Load contracts
  const rocketDAOProtocolSettingsRewards = await RocketDAOProtocolSettingsRewards.deployed();
  return await rocketDAOProtocolSettingsRewards.getClaimIntervalTime.call();
}