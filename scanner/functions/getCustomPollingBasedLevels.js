function getCustomPollingBasedLevels(baseVariable, defaultLevels) {
                const customLevels = getCustomLevels(baseVariable);
                return (pollingIntervalChanged || customLevels) && createPollingIntervalBasedLevels(customLevels ? { ...defaultLevels, ...customLevels } : defaultLevels);
            }