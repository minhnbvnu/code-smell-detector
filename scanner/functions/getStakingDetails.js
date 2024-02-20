function getStakingDetails(nodeAddress) {
        return Promise.all([
            rocketNodeStaking.getTotalRPLStake.call(),
            rocketNodeStaking.getNodeRPLStake.call(nodeAddress),
            rocketNodeStaking.getNodeEffectiveRPLStake.call(nodeAddress),
            rocketNodeStaking.getNodeETHMatched.call(nodeAddress),
            rocketNodeStaking.getNodeETHMatchedLimit.call(nodeAddress),
        ]).then(
            ([totalStake, nodeStake, nodeEffectiveStake, nodeEthMatched, nodeEthMatchedLimit]) =>
            ({totalStake, nodeStake, nodeEffectiveStake, nodeEthMatched, nodeEthMatchedLimit})
        );
    }