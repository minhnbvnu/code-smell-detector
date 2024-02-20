async function getRethBalance(address) {
    const rocketTokenRETH = await RocketTokenRETH.deployed();
    let balance = rocketTokenRETH.balanceOf.call(address);
    return balance;
}