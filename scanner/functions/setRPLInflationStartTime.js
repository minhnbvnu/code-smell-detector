async function setRPLInflationStartTime(startTime, txOptions) {
    // Set it now
    await setDAOProtocolBootstrapSetting(RocketDAOProtocolSettingsInflation, 'rpl.inflation.interval.start', startTime, txOptions);
}