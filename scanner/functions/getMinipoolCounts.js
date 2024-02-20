function getMinipoolCounts(nodeAddress) {
        return Promise.all([
            rocketMinipoolManager.getMinipoolCount.call(),
            rocketMinipoolManager.getNodeMinipoolCount.call(nodeAddress),
        ]).then(
            ([total, node]) =>
            ({total, node})
        );
    }