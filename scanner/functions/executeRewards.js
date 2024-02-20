async function executeRewards(index, rewards, treasuryRPL, userETH, txOptions) {

    // Load contracts
    const [
        rocketRewardsPool,
    ] = await Promise.all([
        RocketRewardsPool.deployed(),
    ]);

    // Construct the merkle tree
    let treeData = parseRewardsMap(rewards);

    const trustedNodeRPL = [];
    const nodeRPL = [];
    const nodeETH = [];
    treasuryRPL = web3.utils.toBN(treasuryRPL);
    userETH = web3.utils.toBN(userETH);

    let maxNetwork = rewards.reduce((a,b) => Math.max(a, b.network), 0);

    for(let i = 0; i <= maxNetwork; i++) {
        trustedNodeRPL[i] = '0'.BN
        nodeRPL[i] = '0'.BN
        nodeETH[i] = '0'.BN
    }

    for(let i = 0; i < rewards.length; i++) {
        trustedNodeRPL[rewards[i].network] = trustedNodeRPL[rewards[i].network].add(web3.utils.toBN(rewards[i].trustedNodeRPL))
        nodeRPL[rewards[i].network] = nodeRPL[rewards[i].network].add(web3.utils.toBN(rewards[i].nodeRPL))
        nodeETH[rewards[i].network] = nodeETH[rewards[i].network].add(web3.utils.toBN(rewards[i].nodeETH))
    }

    // web3 doesn't like an array of BigNumbers, have to convert to dec string
    for(let i = 0; i <= maxNetwork; i++) {
        trustedNodeRPL[i] = trustedNodeRPL[i].toString()
        nodeRPL[i] = nodeRPL[i].toString()
        nodeETH[i] = nodeETH[i].toString()
    }

    const root = treeData.proof.merkleRoot;
    const cid = '0';

    const submission = {
        rewardIndex: index,
        executionBlock: 0,
        consensusBlock: 0,
        merkleRoot: root,
        merkleTreeCID: cid,
        intervalsPassed: 1,
        treasuryRPL: treasuryRPL.toString(),
        trustedNodeRPL: trustedNodeRPL,
        nodeRPL: nodeRPL,
        nodeETH: nodeETH,
        userETH: userETH.toString()
    }

    // Submit prices
    let rewardIndex1 = await rocketRewardsPool.getRewardIndex();
    await rocketRewardsPool.executeRewardSnapshot(submission, txOptions);
    let rewardIndex2 = await rocketRewardsPool.getRewardIndex();

    // Check index incremented
    assertBN.equal(rewardIndex2, rewardIndex1.add('1'.BN), 'Incorrect updated network prices block');
}