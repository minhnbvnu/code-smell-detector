async function setDAONetworkBootstrapRewardsClaimer(_contractName, _perc, txOptions, expectedTotalPerc = null) {
    // Load contracts
    const rocketDAOProtocol = await RocketDAOProtocol.deployed();
    const rocketDAOProtocolSettingsRewards = await RocketDAOProtocolSettingsRewards.deployed();
    // Get data about the tx
    function getTxData() {
        return Promise.all([
            rocketDAOProtocolSettingsRewards.getRewardsClaimerPerc(_contractName),
            rocketDAOProtocolSettingsRewards.getRewardsClaimersPercTotal(),
        ]).then(
            ([rewardsClaimerPerc, rewardsClaimersPercTotal]) =>
            ({rewardsClaimerPerc, rewardsClaimersPercTotal})
        );
    }
    // Perform tx
    await rocketDAOProtocol.bootstrapSettingClaimer(_contractName, _perc, txOptions);
    // Capture data
    let dataSet2 = await getTxData();
    // Verify
    assertBN.equal(dataSet2.rewardsClaimerPerc, _perc, 'Claim percentage not updated correctly');
    // Verify an expected total Perc if given
    if (expectedTotalPerc) {
        assertBN.equal(dataSet2.rewardsClaimersPercTotal, expectedTotalPerc, 'Total claim percentage not matching given target');
    }
}