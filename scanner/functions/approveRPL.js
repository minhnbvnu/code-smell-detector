async function approveRPL(spender, amount, txOptions) {
    const rocketTokenRPL = await RocketTokenRPL.deployed();
    await rocketTokenRPL.approve(spender, amount, txOptions);
}