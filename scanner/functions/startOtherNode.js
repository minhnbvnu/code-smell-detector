async function startOtherNode(numBlocks = 5) {
        const netconfig = Dummy.NETCONFIG;
        const consensus = await Consensus.volatileFull(netconfig);
        testChain = await TestBlockchain.createVolatileTest(numBlocks);
        for (const block of (await testChain.getBlocks(consensus.blockchain.headHash))) {
            await consensus.blockchain.pushBlock(await testChain.getBlock(block.hash(), true, true));
        }
        consensus.network.connect();
        return consensus;
    }