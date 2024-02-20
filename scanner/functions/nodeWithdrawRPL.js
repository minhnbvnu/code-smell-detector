async function nodeWithdrawRPL(amount, txOptions) {
    const rocketNodeStaking= await RocketNodeStaking.deployed();
    await rocketNodeStaking.withdrawRPL(amount, txOptions);
}