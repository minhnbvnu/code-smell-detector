async function executeUpdatePrices(block, rplPrice, txOptions) {
    // Load contracts
    const rocketNetworkPrices = await RocketNetworkPrices.deployed();

    // Get prices
    function getPrices() {
        return Promise.all([
            rocketNetworkPrices.getPricesBlock.call(),
            rocketNetworkPrices.getRPLPrice.call(),
        ]).then(
          ([block, rplPrice]) =>
            ({block, rplPrice})
        );
    }

    // Submit prices
    await rocketNetworkPrices.executeUpdatePrices(block, rplPrice, txOptions);

    // Get updated submission details & prices
    let prices = await getPrices();

    // Check the prices
    assertBN.equal(prices.block, block, 'Incorrect updated network prices block');
    assertBN.equal(prices.rplPrice, rplPrice, 'Incorrect updated network RPL price');
}