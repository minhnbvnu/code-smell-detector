async function auctionCreateLot(txOptions) {
    const rocketAuctionManager = await RocketAuctionManager.deployed();
    await rocketAuctionManager.createLot(txOptions);
}