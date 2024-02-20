async function depositExcessCollateral(txOptions) {
    const rocketTokenRETH = await RocketTokenRETH.deployed();
    await rocketTokenRETH.depositExcessCollateral(txOptions);
}