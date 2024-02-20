async function executeUpdateBalances(block, totalEth, stakingEth, rethSupply, txOptions) {
    // Load contracts
    const rocketNetworkBalances = await RocketNetworkBalances.deployed()

    // Get balances
    function getBalances() {
        return Promise.all([
            rocketNetworkBalances.getBalancesBlock.call(),
            rocketNetworkBalances.getTotalETHBalance.call(),
            rocketNetworkBalances.getStakingETHBalance.call(),
            rocketNetworkBalances.getTotalRETHSupply.call(),
        ]).then(
          ([block, totalEth, stakingEth, rethSupply]) =>
            ({block, totalEth, stakingEth, rethSupply})
        );
    }

    // Submit balances
    await rocketNetworkBalances.executeUpdateBalances(block, totalEth, stakingEth, rethSupply, txOptions);

    // Get updated balances
    let balances = await getBalances()

    // Check balances
    assertBN.equal(balances.block, web3.utils.toBN(block), 'Incorrect updated network balances block');
    assertBN.equal(balances.totalEth, web3.utils.toBN(totalEth), 'Incorrect updated network total ETH balance');
    assertBN.equal(balances.stakingEth, web3.utils.toBN(stakingEth), 'Incorrect updated network staking ETH balance');
    assertBN.equal(balances.rethSupply, web3.utils.toBN(rethSupply), 'Incorrect updated network total rETH supply');
}