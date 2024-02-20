async function setRewardsClaimIntervalTime(intervalTime, txOptions) {
    // Set it now
    await setDAOProtocolBootstrapSetting(RocketDAOProtocolSettingsRewards, 'rpl.rewards.claim.period.time', intervalTime, txOptions);
}