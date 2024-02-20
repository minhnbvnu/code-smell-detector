function getInflationData() {
        return Promise.all([
            getCurrentTime(web3),
            rocketTokenRPL.totalSupply.call(),
            rocketTokenRPL.getInflationIntervalStartTime.call(),
            rocketTokenRPL.getInflationIntervalsPassed.call(),
            rocketTokenRPL.getInflationCalcTime.call(),
            rocketTokenRPL.getInflationIntervalTime.call(),
            rocketTokenRPL.balanceOf(rocketVault.address),
            rocketVault.balanceOfToken('rocketRewardsPool', rocketTokenRPL.address),
        ]).then(
            ([currentTime, tokenTotalSupply, inflationStartTime, inflationIntervalsPassed, inflationCalcTime, intervalTime, rocketVaultBalanceRPL, rocketVaultInternalBalanceRPL]) =>
            ({currentTime, tokenTotalSupply, inflationStartTime, inflationIntervalsPassed, inflationCalcTime, intervalTime, rocketVaultBalanceRPL, rocketVaultInternalBalanceRPL})
        );
    }