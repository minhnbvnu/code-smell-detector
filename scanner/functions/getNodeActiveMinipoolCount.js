async function getNodeActiveMinipoolCount(nodeAddress) {
    const rocketMinipoolManager = await RocketMinipoolManager.deployed();
    let count = await rocketMinipoolManager.getNodeActiveMinipoolCount.call(nodeAddress);
    return count;
}