async function mintRPL(owner, toAddress, amount) {

    // Load contracts
    const [rocketTokenDummyRPL, rocketTokenRPL] = await Promise.all([
        RocketTokenDummyRPL.deployed(),
        RocketTokenRPL.deployed(),
    ]);

    // Mint dummy RPL to address
    await rocketTokenDummyRPL.mint(toAddress, amount, {from: owner});

    // Swap dummy RPL for RPL
    await rocketTokenDummyRPL.approve(rocketTokenRPL.address, amount, {from: toAddress});
    await rocketTokenRPL.swapTokens(amount, {from: toAddress});

}