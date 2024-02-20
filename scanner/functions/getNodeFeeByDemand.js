async function getNodeFeeByDemand(nodeDemand) {
    const rocketNetworkFees = await RocketNetworkFees.deployed();
    let nodeFee = await rocketNetworkFees.getNodeFeeByDemand.call(nodeDemand);
    return nodeFee;
}