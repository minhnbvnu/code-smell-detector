async function getMinipoolSetting(setting) {
    const rocketDAOProtocolSettingsMinipool = await RocketDAOProtocolSettingsMinipool.deployed();
    let value = await rocketDAOProtocolSettingsMinipool['get' + setting].call();
    return value;
}