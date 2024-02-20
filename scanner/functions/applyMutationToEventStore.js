function applyMutationToEventStore(eventStore, eventConfigBase, mutation, calendar) {
        var eventConfigs = compileEventUis(eventStore.defs, eventConfigBase);
        var dest = createEmptyEventStore();
        for (var defId in eventStore.defs) {
            var def = eventStore.defs[defId];
            dest.defs[defId] = applyMutationToEventDef(def, eventConfigs[defId], mutation, calendar.pluginSystem.hooks.eventDefMutationAppliers, calendar);
        }
        for (var instanceId in eventStore.instances) {
            var instance = eventStore.instances[instanceId];
            var def = dest.defs[instance.defId]; // important to grab the newly modified def
            dest.instances[instanceId] = applyMutationToEventInstance(instance, def, eventConfigs[instance.defId], mutation, calendar);
        }
        return dest;
    }