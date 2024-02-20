async function getTotalETHBalance() {
    const rocketNetworkBalances = await RocketNetworkBalances.deployed();
    let balance = await rocketNetworkBalances.getTotalETHBalance.call();
    return balance;
}