function setCustomPollingValues(system) {
            if (!system.getEnvironmentVariable) {
                return;
            }
            const pollingIntervalChanged = setCustomLevels("TSC_WATCH_POLLINGINTERVAL", PollingInterval);
            pollingChunkSize = getCustomPollingBasedLevels("TSC_WATCH_POLLINGCHUNKSIZE", defaultChunkLevels) || pollingChunkSize;
            unchangedPollThresholds = getCustomPollingBasedLevels("TSC_WATCH_UNCHANGEDPOLLTHRESHOLDS", defaultChunkLevels) || unchangedPollThresholds;
            function getLevel(envVar, level) {
                return system.getEnvironmentVariable(`${envVar}_${level.toUpperCase()}`);
            }
            function getCustomLevels(baseVariable) {
                let customLevels;
                setCustomLevel("Low");
                setCustomLevel("Medium");
                setCustomLevel("High");
                return customLevels;
                function setCustomLevel(level) {
                    const customLevel = getLevel(baseVariable, level);
                    if (customLevel) {
                        (customLevels || (customLevels = {}))[level] = Number(customLevel);
                    }
                }
            }
            function setCustomLevels(baseVariable, levels) {
                const customLevels = getCustomLevels(baseVariable);
                if (customLevels) {
                    setLevel("Low");
                    setLevel("Medium");
                    setLevel("High");
                    return true;
                }
                return false;
                function setLevel(level) {
                    levels[level] = customLevels[level] || levels[level];
                }
            }
            function getCustomPollingBasedLevels(baseVariable, defaultLevels) {
                const customLevels = getCustomLevels(baseVariable);
                return (pollingIntervalChanged || customLevels) && createPollingIntervalBasedLevels(customLevels ? { ...defaultLevels, ...customLevels } : defaultLevels);
            }
        }