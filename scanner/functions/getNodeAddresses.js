async function getNodeAddresses() {
    const rocketNodeManager = await RocketNodeManager.deployed();
    return await rocketNodeManager.getNodeAddresses(0, 1000);
}