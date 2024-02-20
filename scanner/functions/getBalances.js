function getBalances() {
        return Promise.all([
            rocketTokenDummyRPL.totalSupply.call(),
            rocketTokenDummyRPL.balanceOf.call(to),
        ]).then(
            ([tokenSupply, userTokenBalance]) =>
            ({tokenSupply, userTokenBalance})
        );
    }