async function getNodeDemand() {
    const rocketNetworkFees = await RocketNetworkFees.deployed();
    let nodeDemand = await rocketNetworkFees.getNodeDemand.call();
    return nodeDemand;
}