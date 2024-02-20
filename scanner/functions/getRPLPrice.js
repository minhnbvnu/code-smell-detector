async function getRPLPrice() {
    const rocketNetworkPrices = await RocketNetworkPrices.deployed();
    let price = await rocketNetworkPrices.getRPLPrice.call();
    return price;
}