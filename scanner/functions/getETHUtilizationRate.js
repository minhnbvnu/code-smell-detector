async function getETHUtilizationRate() {
    const rocketNetworkBalances = await RocketNetworkBalances.deployed();
    let utilizationRate = await rocketNetworkBalances.getETHUtilizationRate.call();
    return utilizationRate;
}