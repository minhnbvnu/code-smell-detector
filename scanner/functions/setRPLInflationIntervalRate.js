async function setRPLInflationIntervalRate(yearlyInflationPerc, txOptions) {
    // Calculate the inflation rate per day
    let dailyInflation = (1 + yearlyInflationPerc) ** (1 / (365)).toFixed(18);
    // Set it now
    await setDAOProtocolBootstrapSetting(RocketDAOProtocolSettingsInflation, 'rpl.inflation.interval.rate', dailyInflation.ether, txOptions);
}