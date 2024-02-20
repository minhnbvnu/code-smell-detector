async function getNodeAverageFee(nodeAddress) {
    const rocketNodeManager = await RocketNodeManager.deployed();
    let averageFee = await rocketNodeManager.getAverageNodeFee.call(nodeAddress);
    return averageFee;
}