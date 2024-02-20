async function getNethBalance(address) {
    const rocketTokenNETH = await RocketTokenNETH.deployed();
    let balance = rocketTokenNETH.balanceOf.call(address);
    return balance;
}