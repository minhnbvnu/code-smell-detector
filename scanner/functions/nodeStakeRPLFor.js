async function nodeStakeRPLFor(nodeAddress, amount, txOptions) {
    const [rocketNodeStaking, rocketTokenRPL] = await Promise.all([
        RocketNodeStaking.deployed(),
        RocketTokenRPL.deployed(),
    ]);
    await rocketTokenRPL.approve(rocketNodeStaking.address, amount, txOptions);
    const before = await rocketNodeStaking.getNodeRPLStake(nodeAddress);
    await rocketNodeStaking.stakeRPLFor(nodeAddress, amount, txOptions);
    const after = await rocketNodeStaking.getNodeRPLStake(nodeAddress);
    assertBN.equal(after.sub(before), amount, 'Staking balance did not increase by amount staked');
}