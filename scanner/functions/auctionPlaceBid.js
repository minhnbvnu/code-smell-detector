async function auctionPlaceBid(lotIndex, txOptions) {
    const rocketAuctionManager = await RocketAuctionManager.deployed();
    await rocketAuctionManager.placeBid(lotIndex, txOptions);
}