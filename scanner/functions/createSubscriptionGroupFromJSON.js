function createSubscriptionGroupFromJSON(group) {
        const groupId = parseInt(group.groupId, 10);
        const defaultGroupName = group.groupName;
        const displayNumber = parseInt(group.displayNumber, 10);

        return new SubscriptionGroup(groupId, defaultGroupName, displayNumber);
    }