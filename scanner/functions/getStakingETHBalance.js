async function getStakingETHBalance() {
    const rocketNetworkBalances = await RocketNetworkBalances.deployed();
    let balance = await rocketNetworkBalances.getStakingETHBalance.call();
    return balance;
}