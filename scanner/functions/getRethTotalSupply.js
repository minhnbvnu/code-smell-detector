async function getRethTotalSupply() {
    const rocketTokenRETH = await RocketTokenRETH.deployed();
    let totalSupply = await rocketTokenRETH.totalSupply.call();
    return totalSupply;
}