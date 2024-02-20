async function getRethExchangeRate() {
    const rocketTokenRETH = await RocketTokenRETH.deployed();
    let exchangeRate = await rocketTokenRETH.getExchangeRate.call();
    return exchangeRate;
}