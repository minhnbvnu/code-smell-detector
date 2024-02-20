function ensurePluginMemberMaps(instance) {
        const slots = internalSlotsMap$2.get(instance);
        if (!slots.ruleMap) {
            initPluginMemberMaps(instance, slots);
        }
        return slots;
    }