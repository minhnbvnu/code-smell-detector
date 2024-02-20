async function getMinipoolsByNode(nodeAddress) {
    const rocketMinipoolManager = await RocketMinipoolManager.deployed();
    const count = await rocketMinipoolManager.getNodeMinipoolCount(nodeAddress);
    const minipools = [];
    for (let i = 0; i < count; i++) {
        const address = await rocketMinipoolManager.getNodeMinipoolAt(nodeAddress, i);
        minipools.push(await getMinipoolDetails(address));
    }
    return minipools;
}