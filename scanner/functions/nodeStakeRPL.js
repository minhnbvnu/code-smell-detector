async function nodeStakeRPL(amount, txOptions) {
    const [rocketNodeStaking, rocketTokenRPL] = await Promise.all([
        RocketNodeStaking.deployed(),
        RocketTokenRPL.deployed(),
    ]);
    await rocketTokenRPL.approve(rocketNodeStaking.address, amount, txOptions);
    const before = await rocketNodeStaking.getNodeRPLStake(txOptions.from);
    await rocketNodeStaking.stakeRPL(amount, txOptions);
    const after = await rocketNodeStaking.getNodeRPLStake(txOptions.from);
    assertBN.equal(after.sub(before), amount, 'Staking balance did not increase by amount staked');
}