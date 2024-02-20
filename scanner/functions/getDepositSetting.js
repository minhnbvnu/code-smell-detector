async function getDepositSetting(setting) {
    const rocketDAOProtocolSettingsDeposit = await RocketDAOProtocolSettingsDeposit.deployed();
    let value = await rocketDAOProtocolSettingsDeposit['get' + setting].call();
    return value;
}