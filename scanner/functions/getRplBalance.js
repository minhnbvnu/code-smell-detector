async function getRplBalance(address) {
    const rocketTokenRPL = await RocketTokenRPL.deployed();
    let balance = rocketTokenRPL.balanceOf.call(address);
    return balance;
}