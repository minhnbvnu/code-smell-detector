function filterEventStoreDefs(eventStore, filterFunc) {
        var defs = filterHash(eventStore.defs, filterFunc);
        var instances = filterHash(eventStore.instances, function (instance) {
            return defs[instance.defId]; // still exists?
        });
        return { defs: defs, instances: instances };
    }