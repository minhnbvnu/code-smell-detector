function getLotDetails() {
        return Promise.all([
            rocketAuctionManager.getLotRPLRecovered.call(lotIndex),
            rocketAuctionManager.getLotRemainingRPLAmount.call(lotIndex),
        ]).then(
            ([rplRecovered, remainingRplAmount]) =>
            ({rplRecovered, remainingRplAmount})
        );
    }