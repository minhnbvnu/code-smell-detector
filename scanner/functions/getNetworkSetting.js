async function getNetworkSetting(setting) {
    const rocketDAOProtocolSettingsNetwork = await RocketDAOProtocolSettingsNetwork.deployed();
    let value = await rocketDAOProtocolSettingsNetwork['get' + setting].call();
    return value;
}