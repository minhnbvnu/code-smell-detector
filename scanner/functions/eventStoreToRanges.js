function eventStoreToRanges(eventStore) {
        var instances = eventStore.instances;
        var ranges = [];
        for (var instanceId in instances) {
            ranges.push(instances[instanceId].range);
        }
        return ranges;
    }