function getNodeDetails(nodeAddress) {
        return Promise.all([
            rocketNodeManager.getNodeExists.call(nodeAddress),
            rocketNodeManager.getNodeTimezoneLocation.call(nodeAddress),
        ]).then(
            ([exists, timezoneLocation]) =>
            ({exists, timezoneLocation})
        );
    }