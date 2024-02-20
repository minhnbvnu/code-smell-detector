async function getLotEndBlock(lotIndex) {
    const rocketAuctionManager = await RocketAuctionManager.deployed();
    let endBlock = await rocketAuctionManager.getLotEndBlock.call(lotIndex);
    return endBlock;
}