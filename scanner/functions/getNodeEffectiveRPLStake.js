async function getNodeEffectiveRPLStake(nodeAddress) {
    const rocketNodeStaking = await RocketNodeStaking.deployed();
    let effectiveStake = await rocketNodeStaking.getNodeEffectiveRPLStake.call(nodeAddress);
    return effectiveStake;
}