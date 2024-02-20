function getTokenBalances(nodeAddress) {
        return Promise.all([
            rocketTokenRPL.balanceOf.call(nodeAddress),
            rocketTokenRPL.balanceOf.call(rocketVault.address),
            rocketVault.balanceOfToken.call('rocketNodeStaking', rocketTokenRPL.address),
        ]).then(
            ([nodeRpl, vaultRpl, stakingRpl]) =>
            ({nodeRpl, vaultRpl, stakingRpl})
        );
    }