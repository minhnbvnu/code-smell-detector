function getMinipoolQueueDetails() {
        return Promise.all([
            rocketMinipoolQueue.getTotalLength.call(),
            rocketMinipoolQueue.getTotalCapacity.call(),
        ]).then(
            ([totalLength, totalCapacity]) =>
            ({totalLength, totalCapacity})
        );
    }