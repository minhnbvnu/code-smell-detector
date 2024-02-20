async function getAuctionSetting(setting) {
    const rocketAuctionSettings = await RocketDAOProtocolSettingsAuction.deployed();
    let value = await rocketAuctionSettings['get' + setting].call();
    return value;
}