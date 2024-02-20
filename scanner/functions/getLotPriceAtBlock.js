function getLotPriceAtBlock() {
        return web3.eth.getBlock('latest')
            .then(block => rocketAuctionManager.getLotPriceAtBlock.call(lotIndex, block.number));
    }