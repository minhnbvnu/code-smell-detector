function mapSuggestions(descriptor, sourceCode, messages) {
        if (!descriptor.suggest || !Array.isArray(descriptor.suggest)) {
            return [];
        }
        return descriptor.suggest
            .map(suggestInfo => {
            const computedDesc = suggestInfo.desc || messages[suggestInfo.messageId];
            return {
                ...suggestInfo,
                desc: interpolate(computedDesc, suggestInfo.data),
                fix: normalizeFixes(suggestInfo, sourceCode)
            };
        })
            // Remove suggestions that didn't provide a fix
            .filter(({ fix }) => fix);
    }