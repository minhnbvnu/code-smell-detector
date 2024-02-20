async function getRethCollateralRate() {
    const rocketTokenRETH = await RocketTokenRETH.deployed();
    let collateralRate = await rocketTokenRETH.getCollateralRate.call();
    return collateralRate;
}