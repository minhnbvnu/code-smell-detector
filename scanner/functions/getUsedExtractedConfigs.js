function getUsedExtractedConfigs(instance) {
        const { cache } = internalSlotsMap$2.get(instance);
        return Array.from(cache.values());
    }