function getContractDetails() {
        return Promise.all([
            rocketAuctionManager.getAllottedRPLBalance.call(),
            rocketAuctionManager.getRemainingRPLBalance.call(),
        ]).then(
            ([allottedRplBalance, remainingRplBalance]) =>
            ({allottedRplBalance, remainingRplBalance})
        );
    }