async function getLotStartBlock(lotIndex) {
    const rocketAuctionManager = await RocketAuctionManager.deployed();
    let startBlock = await rocketAuctionManager.getLotStartBlock.call(lotIndex);
    return startBlock;
}