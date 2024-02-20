async function rplSetInflationConfig(config, txOptions) {
    // Set the daily inflation start block
    await setRPLInflationStartTime(config.timeStart, txOptions);
    // Set the daily inflation rate
    await setRPLInflationIntervalRate(config.yearlyInflationTarget, txOptions);
}