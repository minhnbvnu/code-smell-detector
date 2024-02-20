async function getNodeRPLStake(nodeAddress) {
    const rocketNodeStaking = await RocketNodeStaking.deployed();
    let stake = await rocketNodeStaking.getNodeRPLStake.call(nodeAddress);
    return stake;
}