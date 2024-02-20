function getPrices() {
        return Promise.all([
            rocketNetworkPrices.getPricesBlock.call(),
            rocketNetworkPrices.getRPLPrice.call(),
        ]).then(
          ([block, rplPrice]) =>
            ({block, rplPrice})
        );
    }