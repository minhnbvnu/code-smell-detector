async function getNodeMinimumRPLStake(nodeAddress) {
    const rocketNodeStaking = await RocketNodeStaking.deployed();
    let minimumStake = await rocketNodeStaking.getNodeMinimumRPLStake.call(nodeAddress);
    return minimumStake;
}