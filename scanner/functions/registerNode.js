async function registerNode(txOptions) {
    const rocketNodeManager = await RocketNodeManager.deployed();
    await rocketNodeManager.registerNode('Australia/Brisbane', txOptions);
}