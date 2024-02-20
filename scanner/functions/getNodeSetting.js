async function getNodeSetting(setting) {
    const rocketDAOProtocolSettingsNode = await RocketDAOProtocolSettingsNode.deployed();
    let value = await rocketDAOProtocolSettingsNode['get' + setting].call();
    return value;
}